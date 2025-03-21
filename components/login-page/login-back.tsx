import Image from "next/image";
import loginBackground from '@/public/backgrounds/login-background_opt.jpg';

export default function LoginBack() {
  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <Image
        src={loginBackground}
        alt="Login background"
        layout="fill" // Makes it cover the whole div
        objectFit="cover" // Ensures it scales correctly
        quality={75} // Reduces file size while keeping quality
        priority // Loads faster, improving LCP
        placeholder="blur" // Shows a blurred version first
      />
    </div>
  );
}
