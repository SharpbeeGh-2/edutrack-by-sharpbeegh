-- Platform-level roles
INSERT INTO roles (role_code, role_name, role_scope, is_system_role) VALUES
    ('SUPER_ADMIN', 'Super Admin', 'platform', TRUE),
    ('PLATFORM_ADMIN', 'Platform Admin', 'platform', TRUE),
    ('SUPPORT_AGENT', 'Support Agent', 'platform', TRUE),
    ('FINANCE_ADMIN', 'Finance Admin', 'platform', TRUE),
    ('SALES_ADMIN', 'Sales Admin', 'platform', TRUE),
    ('OPERATIONS_ADMIN', 'Operations Admin', 'platform', TRUE),
    ('READ_ONLY_ADMIN', 'Read Only Admin', 'platform', TRUE);

-- School-level roles
INSERT INTO roles (role_code, role_name, role_scope, is_system_role) VALUES
    ('SCHOOL_OWNER', 'School Owner', 'school', TRUE),
    ('SCHOOL_ADMIN', 'School Admin', 'school', TRUE),
    ('HEADTEACHER', 'Headteacher', 'school', TRUE),
    ('ACADEMIC_COORDINATOR', 'Academic Coordinator', 'school', TRUE),
    ('TEACHER', 'Teacher', 'school', TRUE),
    ('CLASS_TEACHER', 'Class Teacher', 'school', TRUE),
    ('SUBJECT_TEACHER', 'Subject Teacher', 'school', TRUE),
    ('ACCOUNTS_OFFICER', 'Accounts Officer', 'school', TRUE),
    ('ATTENDANCE_OFFICER', 'Attendance Officer', 'school', TRUE),
    ('PARENT', 'Parent', 'school', TRUE),
    ('STUDENT', 'Student', 'school', TRUE);

-- Subscription plans — placeholder pricing per the gap analysis, tune later
INSERT INTO subscription_plans (plan_name, plan_code, description, monthly_price, annual_price, max_students, max_staff, trial_days) VALUES
    ('Free', 'FREE', 'Perfect for small schools getting started', 0, 0, 50, 2, 30),
    ('Basic', 'BASIC', 'Ideal for growing schools', 150, 1500, 300, 20, 30),
    ('Premium', 'PREMIUM', 'For established institutions', 400, 4000, NULL, NULL, 30);