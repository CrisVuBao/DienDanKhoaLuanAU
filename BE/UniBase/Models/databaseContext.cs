using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace UniBase.Models
{
    public partial class databaseContext : IdentityDbContext<ApplicationUser, IdentityRole<int>, int>
    {
        public databaseContext()
        {
        }

        public databaseContext(DbContextOptions<databaseContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Comment> Comments { get; set; } = null!;
        public virtual DbSet<Department> Departments { get; set; } = null!;
        public virtual DbSet<Evaluate> Evaluates { get; set; } = null!;
        public virtual DbSet<Forum> Forums { get; set; } = null!;
        public virtual DbSet<ProjectList> ProjectLists { get; set; } = null!;
        public virtual DbSet<Specialized> Specializeds { get; set; } = null!;

        public virtual DbSet<CommentFeedback> CommentFeedbacks { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-UTRCQSJ;Database=database;Trusted_Connection=True;TrustServerCertificate=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<Comment>(entity =>
            {
                entity.ToTable("Comment");

                entity.Property(e => e.CommentDate).HasColumnType("datetime");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Comment_User");
            });

            modelBuilder.Entity<Department>(entity =>
            {
                entity.ToTable("Department");

                entity.Property(e => e.Name).HasMaxLength(255);
            });

            modelBuilder.Entity<Evaluate>(entity =>
            {
                entity.ToTable("Evaluate");
            });

            modelBuilder.Entity<Forum>(entity =>
            {
                entity.ToTable("Forum");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<ProjectList>(entity =>
            {
                entity.ToTable("ProjectList");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Point).HasMaxLength(3);

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.ProjectLists)
                    .HasForeignKey(d => d.DepartmentId)
                    .HasConstraintName("FK_ProjectList_Department");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.ProjectLists)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ProjectList_User");
            });

            modelBuilder.Entity<Specialized>(entity =>
            {
                entity.ToTable("Specialized");

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.Specializeds)
                    .HasForeignKey(d => d.DepartmentId)
                    .HasConstraintName("FK_Specialized_Department");
            });

            modelBuilder.Entity<CommentFeedback>(entity =>
            {
                entity.HasKey(e => e.CommentId)
                    .HasName("PK__CommentF__C3B4DFCACF661EA0");

                entity.ToTable("CommentFeedback");

                entity.Property(e => e.CommentId).ValueGeneratedNever();

                entity.Property(e => e.CommentDate).HasColumnType("datetime");

                /*entity.HasOne(d => d.User)
                    .WithMany(p => p.CommentFeedbacks)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CommentFeedback_User");*/
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}