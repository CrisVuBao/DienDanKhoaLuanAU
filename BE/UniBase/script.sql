CREATE TABLE [AspNetRoles] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(256) NULL,
    [NormalizedName] nvarchar(256) NULL,
    [ConcurrencyStamp] nvarchar(max) NULL,
    CONSTRAINT [PK_AspNetRoles] PRIMARY KEY ([Id])
);
GO


CREATE TABLE [Department] (
    [DepartmentId] int NOT NULL IDENTITY,
    [Name] nvarchar(255) NULL,
    CONSTRAINT [PK_Department] PRIMARY KEY ([DepartmentId])
);
GO


CREATE TABLE [Forum] (
    [ForumId] int NOT NULL IDENTITY,
    [Title] nvarchar(max) NULL,
    [Discriptions] nvarchar(max) NULL,
    [CreatedDate] datetime NULL,
    CONSTRAINT [PK_Forum] PRIMARY KEY ([ForumId])
);
GO


CREATE TABLE [AspNetRoleClaims] (
    [Id] int NOT NULL IDENTITY,
    [RoleId] int NOT NULL,
    [ClaimType] nvarchar(max) NULL,
    [ClaimValue] nvarchar(max) NULL,
    CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [AspNetRoles] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [Specialized] (
    [SpecializedId] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [DepartmentId] int NULL,
    CONSTRAINT [PK_Specialized] PRIMARY KEY ([SpecializedId]),
    CONSTRAINT [FK_Specialized_Department] FOREIGN KEY ([DepartmentId]) REFERENCES [Department] ([DepartmentId])
);
GO


CREATE TABLE [AspNetUsers] (
    [Id] int NOT NULL IDENTITY,
    [checkComment] int NULL,
    [DepartmentId] int NULL,
    [ClassId] int NULL,
    [Name] nvarchar(max) NULL,
    [Address] nvarchar(max) NULL,
    [DateOfBirth] datetime2 NULL,
    [Sex] nvarchar(max) NULL,
    [Image] nvarchar(max) NULL,
    [SpecializedId] int NULL,
    [UserName] nvarchar(256) NULL,
    [NormalizedUserName] nvarchar(256) NULL,
    [Email] nvarchar(256) NULL,
    [NormalizedEmail] nvarchar(256) NULL,
    [EmailConfirmed] bit NOT NULL,
    [PasswordHash] nvarchar(max) NULL,
    [SecurityStamp] nvarchar(max) NULL,
    [ConcurrencyStamp] nvarchar(max) NULL,
    [PhoneNumber] nvarchar(max) NULL,
    [PhoneNumberConfirmed] bit NOT NULL,
    [TwoFactorEnabled] bit NOT NULL,
    [LockoutEnd] datetimeoffset NULL,
    [LockoutEnabled] bit NOT NULL,
    [AccessFailedCount] int NOT NULL,
    CONSTRAINT [PK_AspNetUsers] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_AspNetUsers_Department_DepartmentId] FOREIGN KEY ([DepartmentId]) REFERENCES [Department] ([DepartmentId]),
    CONSTRAINT [FK_AspNetUsers_Specialized_SpecializedId] FOREIGN KEY ([SpecializedId]) REFERENCES [Specialized] ([SpecializedId])
);
GO


CREATE TABLE [AspNetUserClaims] (
    [Id] int NOT NULL IDENTITY,
    [UserId] int NOT NULL,
    [ClaimType] nvarchar(max) NULL,
    [ClaimValue] nvarchar(max) NULL,
    CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [AspNetUserLogins] (
    [LoginProvider] nvarchar(450) NOT NULL,
    [ProviderKey] nvarchar(450) NOT NULL,
    [ProviderDisplayName] nvarchar(max) NULL,
    [UserId] int NOT NULL,
    CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY ([LoginProvider], [ProviderKey]),
    CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [AspNetUserRoles] (
    [UserId] int NOT NULL,
    [RoleId] int NOT NULL,
    CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY ([UserId], [RoleId]),
    CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [AspNetRoles] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [AspNetUserTokens] (
    [UserId] int NOT NULL,
    [LoginProvider] nvarchar(450) NOT NULL,
    [Name] nvarchar(450) NOT NULL,
    [Value] nvarchar(max) NULL,
    CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY ([UserId], [LoginProvider], [Name]),
    CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [Comment] (
    [CommentId] int NOT NULL IDENTITY,
    [UserId] int NOT NULL,
    [FullName] nvarchar(max) NULL,
    [Email] nvarchar(max) NULL,
    [CommentDate] datetime NULL,
    [Discriptions] nvarchar(max) NULL,
    [CommentType] nvarchar(max) NULL,
    [PostId] int NOT NULL,
    [ByCommentId] int NULL,
    CONSTRAINT [PK_Comment] PRIMARY KEY ([CommentId]),
    CONSTRAINT [FK_Comment_User] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id])
);
GO


CREATE TABLE [CommentFeedback] (
    [CommentId] int NOT NULL,
    [UserId] int NOT NULL,
    [FullName] nvarchar(max) NULL,
    [Email] nvarchar(max) NULL,
    [CommentDate] datetime NULL,
    [Discriptions] nvarchar(max) NULL,
    [CommentType] nvarchar(max) NULL,
    [PostId] int NOT NULL,
    [ByUserId] int NULL,
    CONSTRAINT [PK__CommentF__C3B4DFCACF661EA0] PRIMARY KEY ([CommentId]),
    CONSTRAINT [FK_CommentFeedback_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [Evaluate] (
    [EvaluateId] int NOT NULL IDENTITY,
    [UserId] int NOT NULL,
    [CommentId] int NOT NULL,
    CONSTRAINT [PK_Evaluate] PRIMARY KEY ([EvaluateId]),
    CONSTRAINT [FK_Evaluate_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [ProjectList] (
    [ProjectListId] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NULL,
    [Point] nvarchar(3) NULL,
    [LinkDownload] nvarchar(max) NULL,
    [UserId] int NULL,
    [CheckAdmin] int NULL,
    [Image] nvarchar(max) NULL,
    [Discriptions] nvarchar(max) NULL,
    [Watched] int NULL,
    [Download] int NULL,
    [CreatedDate] datetime NULL,
    [SchoolYearId] int NULL,
    [DepartmentId] int NULL,
    CONSTRAINT [PK_ProjectList] PRIMARY KEY ([ProjectListId]),
    CONSTRAINT [FK_ProjectList_Department] FOREIGN KEY ([DepartmentId]) REFERENCES [Department] ([DepartmentId]),
    CONSTRAINT [FK_ProjectList_User] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id])
);
GO


CREATE INDEX [IX_AspNetRoleClaims_RoleId] ON [AspNetRoleClaims] ([RoleId]);
GO


CREATE UNIQUE INDEX [RoleNameIndex] ON [AspNetRoles] ([NormalizedName]) WHERE [NormalizedName] IS NOT NULL;
GO


CREATE INDEX [IX_AspNetUserClaims_UserId] ON [AspNetUserClaims] ([UserId]);
GO


CREATE INDEX [IX_AspNetUserLogins_UserId] ON [AspNetUserLogins] ([UserId]);
GO


CREATE INDEX [IX_AspNetUserRoles_RoleId] ON [AspNetUserRoles] ([RoleId]);
GO


CREATE INDEX [EmailIndex] ON [AspNetUsers] ([NormalizedEmail]);
GO


CREATE INDEX [IX_AspNetUsers_DepartmentId] ON [AspNetUsers] ([DepartmentId]);
GO


CREATE INDEX [IX_AspNetUsers_SpecializedId] ON [AspNetUsers] ([SpecializedId]);
GO


CREATE UNIQUE INDEX [UserNameIndex] ON [AspNetUsers] ([NormalizedUserName]) WHERE [NormalizedUserName] IS NOT NULL;
GO


CREATE INDEX [IX_Comment_UserId] ON [Comment] ([UserId]);
GO


CREATE INDEX [IX_CommentFeedback_UserId] ON [CommentFeedback] ([UserId]);
GO


CREATE INDEX [IX_Evaluate_UserId] ON [Evaluate] ([UserId]);
GO


CREATE INDEX [IX_ProjectList_DepartmentId] ON [ProjectList] ([DepartmentId]);
GO


CREATE INDEX [IX_ProjectList_UserId] ON [ProjectList] ([UserId]);
GO


CREATE INDEX [IX_Specialized_DepartmentId] ON [Specialized] ([DepartmentId]);
GO


