export interface WorkerCatType {

    categoryId: number;
    categoryName: string;
    workerCount: number;
    iconClass: string;
    cardClass: string;
    queryParams?: any;
}

export interface WorkerCatSkillType {

    skillId: number;
    skillName: string;
    workerCount: number;

    iconClass?: string;
    cardClass?: string;
}

export interface WorkerDetailsData {
    state: string | null;
    address: string | null;
    city: string | null;
    age: number | null;
    gender: string | null;
    isActive: boolean;
    email: string;
    workerCode: string;
    firstName: string;
    lastName: string;
    rating: number | null;
    yearsOfExperience: number | null;
    isAvailable: boolean | null;
    phone: string;
    isCompanyAssigned: boolean | null;
    totalJobsCompleted: number;
    totalJobsCancelled: number;
    lastJobCompletedAt: string | null;
    isBlocked: boolean;
    blockReason: string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    lastLoginAt: string | null;
    failedLoginAttempts: number;
    isAccountLocked: boolean;
    workerSkills: WorkerSkill[];


    hiredAbroad: string;
    aadhaar: string;
    qualification: string;
    passport: boolean;
    videoUrl: string;
    videoThumb: string;
    profileCompletion: string;
    createdDate: string;
}

export interface WorkerSkill {
    id: number;
    skill: Skill;
}

export interface Skill {
    id: number;
    category: SkillCategory;
    skillName: string;
}

export interface SkillCategory {
    id: number;
    categoryName: string;
}

export interface WorkerListData {

    id: number,
    workerId: string,
    name: string,
    profileCompletion: number,
    role: string,
    mobileNumber: string,
    status: string,
    hiredAbroad: string,
    interest: string,
    createdDate: string,
    passport: string,
}

