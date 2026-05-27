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




export interface WorkerProfileResponse {
  status: string;
  message: string;
  result: WorkerProfile;
}

export interface WorkerProfile {
  id: number;
  workerCode: string;
  firstName: string;
  lastName: string;
  address: string | null;
  email: string;
  phone: string;
  age: number | null;
  yearsOfExperience: number | null;
  rating: number | null;
  isActive: boolean;
  isAvailable: boolean | null;
  isCompanyAssigned: boolean | null;
  password: string;
  gender: string | null;
  city: string | null;
  state: string | null;
  totalJobsCompleted: number;
  totalJobsCancelled: number;
  lastJobCompletedAt: string;
  isBlocked: boolean;
  blockReason: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  lastLoginAt: string;
  failedLoginAttempts: number;
  isAccountLocked: boolean;

  workerCertificates: WorkerCertificate[];
  workerBankDetails: WorkerBankDetails | null;
  workerPersonalDetails: WorkerPersonalDetails | null;
  abroadStatus: string | null;
  emergencyContact: EmergencyContact | null;
  workerDocuments: WorkerDocument[] | null;

  skill: SkillCategory[];



  videoUrl?: string;
  videoThumb?: string;
  createdDate?: string;
  profileCompletion?: string;
}

export interface WorkerPersonalDetails {
  workerId: number;
  age: number;
  gender: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  aadhaarNo: string;
  highestQualification: string;
  disability: string;
}

export interface SkillCategory {
  categoryId: number;
  categoryName: string;
  skills: Skill[];
}

export interface Skill {
  skillId: number;
  skillName: string;
  isVerified: boolean;
}

/**
 * Placeholder Interfaces
 * Update these when API structure is available
 */

export interface WorkerCertificate {
  [key: string]: any;
}

export interface WorkerBankDetails {
  [key: string]: any;
}

export interface EmergencyContact {
  [key: string]: any;
}

export interface WorkerDocument {
  [key: string]: any;
}
