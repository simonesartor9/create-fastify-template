import {FastifyReply} from "fastify";

async function asyncForEach<T>(array: T[], callback: (item: T, index: number, array: T[]) => Promise<unknown>): Promise<void> {
    for (let index: number = 0, arrayLength: number = array.length; index < arrayLength; index++) {
        await callback(array[index], index, array);
    }
}

function isEmpty(value: string | number | undefined | null | any[] | object): boolean {
    if (value === undefined || value === null) {
        return true;
    } else if (typeof value === 'string' || Array.isArray(value)) {
        return value.length === 0;
    } else if (typeof value === 'object') {
        return Object.keys(value).length === 0;
    } else {
        return false;
    }
}

function generateOTP(length: number): string{
    let digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < length; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

function randomPassword(length = 8, input = "alpha-numeric"): string {
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    let password = "";
    if (input == "alpha") {
        alphabet = "abcdefghijklmnopqrstuvwxyz";
    } else if (input == "alpha-caps") {
        alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    } else if (input == "alpha-numeric") {
        alphabet = "abcdefghijklmnopqrstuvwxyz1234567890";
    } else if (input == "alpha-numeric-caps") {
        alphabet =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    } else if (input == "alpha-numeric-symbols") {
        alphabet = "abcdefghijklmnopqrstuvwxyz1234567890~!@#$%^&*()_+-=";
    } else if (input == "alpha-numeric-caps-symbols") {
        alphabet =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890~!@#$%^&*()_+-=";
    }
    let alphabet_length = alphabet.length - 1;
    for (let i = 0; i < length; i++) {
        let random_number = Math.floor(Math.random() * alphabet_length) + 1;
        password += alphabet[random_number];
    }
    return password;
}

function mimeToExtension(mimeType: string): string {
    switch (mimeType) {
        case 'image/jpeg':
            return '.jpg';
        case 'image/png':
            return '.png';
        case 'image/gif':
            return '.gif';
        case 'application/pdf':
            return '.pdf';
        case 'text/plain':
            return '.txt';
        case 'video/mp4':
            return '.mp4';
        case 'audio/mpeg':
            return '.mp3';
        case 'audio/m4a':
            return '.m4a';
        default:
            return null;
    }
}

function success<T>(reply: FastifyReply, data: T, count = 0) {
    return reply.send({
        success: true,
        data: data,
        totalCount: count
    });
}

export default {asyncForEach, isEmpty, generateOTP, randomPassword, mimeToExtension, success};
