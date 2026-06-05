import { Injectable } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Skill, SkillCategory, VisaMedial, WorkerDocument, WorkerProfile } from '../models/worker.interfaces';


@Injectable({
    providedIn: 'root',
})
export class WorkerProfileFormService {
    constructor(private fb: FormBuilder) { }

    buildForm(worker: WorkerProfile | null): FormGroup {
        return this.fb.group({
            personalDetails: this.createPersonalDetailsGroup(worker),
            passport: this.createPassportGroup(worker),
            skills: this.fb.array(worker?.skill?.map((skillCategory) => this.createSkillCategoryForm(skillCategory)) || []),
            documents: this.createDocumentsGroup(worker?.workerDocuments),
            hiringHistory: this.fb.array(worker?.hiringHistory?.map((history) => this.createHiringHistoryGroup(history)) || []),
            visaMedical: this.createVisaMedicalGroup(worker?.visaMedical),
            emergencyNotes: this.createEmergencyNotesGroup(worker),
            workerBankDetails: this.createBankDetailsGroup(worker),
            workerCertificates: this.fb.array(worker?.workerCertificates?.map((certificates) => this.createCertificatesGroup(certificates)) || []),

        });
    }

    private createPersonalDetailsGroup(
        worker: WorkerProfile | null
    ): FormGroup {
        return this.fb.group({
            name: [{ value: worker ? `${worker.firstName} ${worker.lastName}` : '', disabled: true, }, [Validators.required],],
            age: [{ value: worker?.workerPersonalDetails?.age ?? worker?.age ?? null, disabled: true, }, [Validators.required],],
            mobileNumber: [{ value: worker?.phone ?? '', disabled: true, }, [Validators.required],],
            contactNumber: [{ value: worker?.phone ?? '', disabled: true, }, [Validators.required],],
            aadhaar: [{ value: worker?.workerPersonalDetails?.aadhaarNo ?? '', disabled: true, }, [Validators.required],],
            qualification: [{ value: worker?.workerPersonalDetails?.highestQualification ?? '', disabled: true, }, [Validators.required],],
            address: [{ value: worker?.workerPersonalDetails?.address ?? worker?.address ?? '', disabled: true, }, [Validators.required],],
            passport: [{ value: '', disabled: true, },],
            experience: [{ value: worker?.yearsOfExperience ?? null, disabled: true, }, [Validators.required],],
            gender: [{ value: worker?.workerPersonalDetails?.gender ?? worker?.gender ?? '', disabled: true, },],
            city: [{ value: worker?.workerPersonalDetails?.city ?? worker?.city ?? '', disabled: true, },],
            state: [{ value: worker?.workerPersonalDetails?.state ?? worker?.state ?? '', disabled: true, },],
            pincode: [{ value: worker?.workerPersonalDetails?.pincode ?? '', disabled: true, },],
            disability: [{ value: worker?.workerPersonalDetails?.disability ?? '', disabled: true, },],
        });
    }

    private createSkillCategoryForm(
        category: SkillCategory
    ): FormGroup {
        return this.fb.group({
            categoryId: [category.categoryId],
            categoryName: [{ value: category.categoryName, disabled: true, },],
            skills: this.fb.array(category.skills.map((skill) => this.createSkillForm(skill))),
        });
    }

    private createHiringHistoryGroup(
        history: any
    ): FormGroup {
        return this.fb.group({
            companyName: [history.companyName],
            startDate: [{ value: history.startDate, disabled: true, },],
            endDate: [{ value: history.endDate, disabled: true, },],
            rating: [{ value: history.rating, disabled: true, },],
            location: [{ value: history.location, disabled: true, },],
        });
    }

    private createSkillForm(skill: Skill): FormGroup {
        return this.fb.group({
            skillId: [skill.skillId],
            skillName: [{ value: skill.skillName, disabled: true, },],
            isVerified: [{ value: skill.isVerified, disabled: true, },],
        });
    }

    getSkillsFormArray(form: FormGroup): FormArray {
        return form.get('skills') as FormArray;
    }

    getSkillControls(
        form: FormGroup,
        index: number
    ): FormArray {
        return this.getSkillsFormArray(form).at(index).get('skills') as FormArray;
    }





    private createDocumentsGroup(
        documents: WorkerDocument | any
    ): FormGroup {
        return this.fb.group({
            workerId: [{ value: documents?.workerId ?? '', disabled: true }],
            drivingLicenseNo: [{ value: documents?.drivingLicenseNo ?? '', disabled: true }],
            aadharNo: [{ value: documents?.aadharNo ?? '', disabled: true }],
            panNo: [{ value: documents?.panNo ?? '', disabled: true }]
        });
    }


    private createVisaMedicalGroup(
        visaMedical: VisaMedial | any
    ): FormGroup {
        return this.fb.group({
            abroadStatus: [{ value: visaMedical?.abroadStatus ?? '', disabled: true }],
            preferredCountry: [{ value: visaMedical?.preferredCountry ?? '', disabled: true }]
        });
    }


    private createEmergencyNotesGroup(
        worker: WorkerProfile | null
    ): FormGroup {

        return this.fb.group({
            contactName: [{ value: worker?.emergencyContact?.contactName ?? '', disabled: true }],
            relation: [{ value: worker?.emergencyContact?.relation ?? '', disabled: true }],
            contactNumber: [{ value: worker?.emergencyContact?.contactNumber ?? '', disabled: true }],
            internalNotes: [{ value: worker?.emergencyContact?.internalNotes ?? '', disabled: true }]
        });
    }

    private createCertificatesGroup(
        certificates: any
    ): FormGroup {

        return this.fb.group({
            id: [{ value: certificates?.id ?? '', disabled: true }],
            startDate: [{ value: certificates?.startDate ?? '', disabled: true }],
            endDate: [{ value: certificates?.endDate ?? '', disabled: true }],
            certification: this.createCertificationSubGroup(certificates.certification),
        });
    }

    private createCertificationSubGroup(
        certificatesDetails: any
    ): FormGroup {

        return this.fb.group({
            certificationId: [{ value: certificatesDetails?.certificationId ?? '', disabled: true }],
            certificationName: [{ value: certificatesDetails?.certificationName ?? '', disabled: true }],
            certificationDescription: [{ value: certificatesDetails?.certificationDescription ?? '', disabled: true }],
            certificationType: [{ value: certificatesDetails?.certificationType ?? '', disabled: true }],
            certificationCategory: [{ value: certificatesDetails?.certificationCategory ?? '', disabled: true }],
            creationDate: [{ value: certificatesDetails?.creationDate ?? '', disabled: true }],
            active: [{ value: certificatesDetails?.active ?? '', disabled: true }],
        });
    }

    private createBankDetailsGroup(
        worker: WorkerProfile | null
    ): FormGroup {

        return this.fb.group({
            workerId: [{ value: worker?.workerBankDetails?.workerId ?? '', disabled: true }],
            bankName: [{ value: worker?.workerBankDetails?.bankName ?? '', disabled: true }],
            accountHolderName: [{ value: worker?.workerBankDetails?.accountHolderName ?? '', disabled: true }],
            accountNumber: [{ value: worker?.workerBankDetails?.accountNumber ?? '', disabled: true }],
            ifscCode: [{ value: worker?.workerBankDetails?.ifscCode ?? '', disabled: true }]
        });
    }




    private createPassportGroup(
        worker: WorkerProfile | null
    ): FormGroup {
        return this.fb.group({
            passportNumber: [{ value: '', disabled: true }],
            issueDate: [{ value: '', disabled: true }],
            expiryDate: [{ value: '', disabled: true }]
        });
    }
}