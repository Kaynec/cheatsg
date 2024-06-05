const errorCodeTranslationMap: Map<string, string> = new Map([
  ['You should authenticate first', 'ابتدا باید لاگین کنید'],
  ['phone_number Already Taken', 'شماره تلفن قبلا استفاده شده است'],
  [
    'Please fill password and confirm password',
    'لطفا رمز عبور و تأیید رمز عبور را پر کنید'
  ],
  [
    'Confirm password is not equal to password',
    'نکرار رمز عبور با رمز عبور برابر نیست'
  ],
  ['otp sent successfully', 'کد تایید با موفقیت ارسال شد'],
  ['Database error {ex}', 'خطای پایگاه داده'],
  ['Sms sent successfully', 'پیامک با موفقیت ارسال شد'],
  ['user not found {ex}', 'کاربر پیدا نشد'],
  ['input data is not valid', 'داده های ورودی معتبر نیستند'],
  [
    'User phone number verified successfully',
    'شماره تلفن کاربر با موفقیت تأیید شد'
  ],
  ['input data is not correct', 'داده های ورودی درست نیستند'],
  ['Password changed successfully', 'رمز عبور با موفقیت تغییر کرد'],
  ['email is verified successfully', 'ایمیل با موفقیت تأیید شد']
])
