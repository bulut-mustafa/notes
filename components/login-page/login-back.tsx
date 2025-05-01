import Image from "next/image";
import loginBackground from '@/public/backgrounds/login-background_opt.jpg';

export default function LoginBack() {
  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <Image
        src={loginBackground}
        alt="Login background"
        layout="fill"
        objectFit="cover" 
        quality={75} 
        priority 
        placeholder="blur"
      />
    </div>
  );
}
