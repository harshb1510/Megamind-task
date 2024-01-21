import { connect } from "@/db/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
const accountSid = 'AC89bad76b7497dcef294ff98428ff6952';
const authToken = 'cdbee271bbf7bf986d6cd0e991c29de1';
const client = require('twilio')(accountSid, authToken);
connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const  phone  = reqBody;
        console.log(phone)
        const user = await User.findOne({phone:`${phone}`})
        console.log(user)
        if (user) {
            // Generate OTP code and set expiration time
            const code = Math.floor(Math.random() * 1000000);
            const expirationTime = Date.now() + 60 * 1000; // 60 seconds from now
            console.log(code);
            console.log(expirationTime);

            user.otpExpiration = expirationTime
            user.otpCode = code;
            await user.save();
            console.log(user);
            // Send OTP using async/await
            const message = await client.messages.create({
                body: `Your OTP for verification is ${code}`,
                from: '+16787103819',
                to: `+91${phone}`
            });

            console.log(message.sid);
            return NextResponse.json({ message: "OTP Sent"}, { status: 200 });
        } else {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
