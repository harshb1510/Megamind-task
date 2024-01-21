import { connect } from "@/db/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const  otp  = reqBody.otp;
        const phone = reqBody.phone;
        const user = await User.findOne({phone:`${phone}`})
        if (user) {
            if (otp == user.otpCode &&  Date.now() < user.otpExpiration) {
                console.log("OTP matched and not expired");
                return NextResponse.json({ message: "OTP matched and verified" }, { status: 200 });
            } else {
                console.log("OTP not matched or expired");
                return NextResponse.json({ message: "OTP not matched or expired" }, { status: 400 });
            }
        } else {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
