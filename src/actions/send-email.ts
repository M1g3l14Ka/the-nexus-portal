'use server'

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async (FormData: FormData) => {
    const name = FormData.get('name') as string;
    const company = FormData.get('company') as string;
    const email = FormData.get('email') as string;
    const subject = FormData.get('subject') as string;
    const message = FormData.get('message') as string;

    if (!message || !email) {
        return { error: "Email and Message are required!" }
    }

    try {
        const data = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: 'katcionma@gmail.com',
            replyTo: email,
            subject:`New job Offer! ${subject}`,
            text:`Name: ${name}\nCompany: ${company}\nEmail: ${email}\n\nMessage: ${message}`,
        });

        return { succes: true, data }
    } catch (error) {
        return { error: 'Something went wrong :(' }
    }

}