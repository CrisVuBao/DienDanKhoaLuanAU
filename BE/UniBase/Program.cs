using UniBase.Models;
using UniBase.Respositories;
using UniBase.Interfaces;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.OpenApi.Models;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity;
using System.Text;
using System.Security.Claims;
using UniBase.Data;

var builder = WebApplication.CreateBuilder(args);

// --- 1. CONFIGURE CORS ---
// Thống nhất dùng tên "AllowAll"
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

// --- 2. ADD SERVICES ---
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
        RoleClaimType = ClaimTypes.Role // Important for Identity roles
    };
});

// Gom tất cả cấu hình JSON vào 1 lần gọi AddControllers duy nhất
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = null; // Giữ nguyên PascalCase
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles; // Tránh vòng lặp
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull; // Bỏ qua null
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "UniBase API",
        Version = "v1"
    });

    // Sửa lỗi trùng tên Schema nếu 2 thư mục có 2 class trùng tên nhau
    c.CustomSchemaIds(type => type.FullName);
});

builder.Services.AddDbContext<databaseContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// --- CẤU HÌNH IDENTITY ---
builder.Services.AddIdentity<ApplicationUser, IdentityRole<int>>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 6;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;
})
.AddEntityFrameworkStores<databaseContext>()
.AddDefaultTokenProviders();

// Cấu hình giới hạn file
builder.Services.Configure<FormOptions>(options => options.MultipartBodyLengthLimit = 1000000000);
builder.Services.Configure<KestrelServerOptions>(options => options.Limits.MaxRequestBodySize = 1000000000);

// Dependency Injection
builder.Services.AddScoped<IUserRespositores, UserRespositores>();
builder.Services.AddScoped<IDeparmentRespotories, DeparmentRespotories>();
builder.Services.AddScoped<ISpecializedRespositories, SpecializedRespositories>();
builder.Services.AddScoped<IForumRespositories, ForumRespositories>();
builder.Services.AddScoped<ICommentRespositories, CommentRespositories>();
builder.Services.AddScoped<IEvaluateRespositories, EvaluateRespositories>();
builder.Services.AddScoped<IProjectListRespositories, ProjectListRespositores>();
builder.Services.AddScoped<ICommentFeedBackRespositories, CommentFeedBackRespositories>();

var app = builder.Build();

// --- 4. SEED DATA ---
using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole<int>>>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
    
    string[] roleNames = { "Admin", "Member" };
    foreach (var roleName in roleNames)
    {
        if (!await roleManager.RoleExistsAsync(roleName))
        {
            await roleManager.CreateAsync(new IdentityRole<int>(roleName));
        }
    }

    // Tạo tài khoản admin mặc định
    var adminUser = await userManager.FindByNameAsync("admin");
    if (adminUser == null)
    {
        adminUser = new ApplicationUser()
        {
            UserName = "admin",
            Email = "admin@system.com",
            Name = "Administrator",
            SecurityStamp = Guid.NewGuid().ToString()
        };
        await userManager.CreateAsync(adminUser, "123456");
        await userManager.AddToRoleAsync(adminUser, "Admin");
    }
}

// --- 3. CONFIGURE PIPELINE ---
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "UniBase API v1");
    });
}

// QUAN TRỌNG: Thứ tự Middleware
// UseCors phải đặt sau UseRouting (nếu có) và trước UseAuthorization
app.UseCors("AllowAll");

app.UseHttpsRedirection();

// Cấu hình Static Files
app.UseStaticFiles(); // Cho phép dùng folder wwwroot mặc định
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.ContentRootPath, "images")),
    RequestPath = "/StaticImages"
});
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.ContentRootPath, "files")),
    RequestPath = "/StaticFiles"
});

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();