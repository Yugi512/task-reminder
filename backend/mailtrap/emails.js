import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}]
    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Verify your email',
            html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken ),
            category: 'Email Verification'
        })
    }
    catch(error){
        console.error(`Error sending verification email:`, error)
        throw new Error(`Error sending verification email: ${error}`)
    }
}

export const sendWelcomeEmail = async (email, username) => {
    const recipient = [{email}]
    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "17056aa2-cc96-4522-b6a0-2946ba742f3a",
            template_variables: {
            "company_info_name": "Task Reminders",
            "name": username
            }
        })
        
    }
    catch(error){
        console.error(`Error sending welcome email: `, error )
        throw new Error(`Error sending welcome email: ${error}`)
    }
}