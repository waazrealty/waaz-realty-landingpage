export const ERROR_EMAIL_INVALID = 'Email is invalid'
export const ERROR_IMAGE_REQUIRED = '⛔ Profile Picture is required'


export enum ErrorMessage {
    ERROR_FULLNAME = '⛔ Full Name is required',
    ERROR_PHONE = '⛔ Phone Number is required',
    ERROR_DISCUSSION = '⛔ Discussion is required',
    ERROR_MESSAGE = '⛔ Message is required',
}

export const SUCCESSFULLY_SUBMITTED = `✅ Form Submitted Successfully`;
export const SUCCESSFULLY_UPDATED = `✅ Details Updated Successfully`;

export enum ContactErrorTypes {
    ERROR_FULLNAME = 'fullname',
    ERROR_PHONE = 'mobile',
    ERROR_DISCUSSION = 'discussion',
    ERROR_MESSAGE = 'message',
}

export enum InspectionErrorTypes {
    ERROR_FULLNAME = 'fullname',
    ERROR_PHONE = 'mobile',
    ERROR_MESSAGE = 'message',
}

export const contactErrorMessageMap: Record<ContactErrorTypes, ErrorMessage> = {
    [ContactErrorTypes.ERROR_FULLNAME]: ErrorMessage.ERROR_FULLNAME,
    [ContactErrorTypes.ERROR_PHONE]: ErrorMessage.ERROR_PHONE,
    [ContactErrorTypes.ERROR_DISCUSSION]: ErrorMessage.ERROR_DISCUSSION,
    [ContactErrorTypes.ERROR_MESSAGE]: ErrorMessage.ERROR_MESSAGE,
}

export const inspectionErrorMessageMap: Record<InspectionErrorTypes, ErrorMessage> = {
    [InspectionErrorTypes.ERROR_FULLNAME]: ErrorMessage.ERROR_FULLNAME,
    [InspectionErrorTypes.ERROR_PHONE]: ErrorMessage.ERROR_PHONE,
    [InspectionErrorTypes.ERROR_MESSAGE]: ErrorMessage.ERROR_MESSAGE,
}