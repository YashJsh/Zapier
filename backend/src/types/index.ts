import * as z from 'zod';

export const signUpSchema = z.object({
    name : z.string().min(3),
    email : z.string(). min(5),
    password : z.string().min(6)
})

export const signInSchema = z.object({
    username : z.string(),
    password : z.string().min(6)
})

export const changePasswordSchema = z.object({
    currentPassword : z.string().min(6),
    newPassword : z.string().min(6)
})

export const ZapCreationSchema = z.object({
    availableTriggerId : z.string(),
    triggerMetadata : z.any().optional(),
    actions :  z.array(z.object({
        availableActionId : z.string(),
        actionMetadata : z.any().optional()
    }))
})