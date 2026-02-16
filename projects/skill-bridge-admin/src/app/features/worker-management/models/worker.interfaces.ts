export interface WorkerCatType {

    title: string;
    count: number;
    iconClass: string;
    cardClass: string;
    queryParams?: any;
}

export interface WorkerDetailsData {

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
    personalDetails: any, 
    passport: any, 
    skills: any, 
    documents: any, 
    visaMedical: any, 
    hiringHistory: any, 
    emergencyNotes: any,
    videoUrl?: string,
    videoThumb?: string,
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

