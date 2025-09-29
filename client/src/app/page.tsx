import Navbar from "@/components/landing-page/Navbar";
import { Badge } from "@/components/ui/badge";
import { Book, LucideUsers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { LuLogIn } from "react-icons/lu";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full bg-black">
      {/* Deep Ocean Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 50%, #2a5d77 0%, #184058 18%, #0f2a43 34%, #0a1b30 50%, #071226 66%, #040d1c 80%, #020814 92%, #01040d 97%, #000309 100%), radial-gradient(160% 130% at 10% 10%, rgba(0,0,0,0) 38%, #000309 76%, #000208 100%), radial-gradient(160% 130% at 90% 90%, rgba(0,0,0,0) 38%, #000309 76%, #000208 100%)",
        }}
      />
      {/* Your Content/Components */}
      <Navbar />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center">
        <div className={"space-x-3"}>
          <div className="flex gap-4">
            <Badge
              variant="default"
              className="flex items-center border-0 bg-gradient-to-r from-sky-800 to-sky-600 px-4 py-2 shadow-md"
            >
              <LucideUsers className="mr-2 h-5 w-5 text-sky-200" />
              <span className="text-sm font-medium text-sky-100">
                from students to students
              </span>
            </Badge>
            <Badge
              variant="default"
              className="flex items-center border-0 bg-gradient-to-r from-sky-800 to-sky-600 px-4 py-2 shadow-md"
            >
              <Book className="mr-2 h-5 w-5 text-sky-200" />
              <span className="text-sm font-medium text-sky-100">
                100+ Soal Ujian
              </span>
            </Badge>
          </div>
        </div>
        <h1 className="max-w-2xl scroll-m-20 bg-gradient-to-br from-sky-100 to-sky-700 bg-clip-text py-5 text-center text-6xl font-extrabold tracking-tight text-balance text-transparent">
          Akses semua materi kuliah jadi lebih mudah.
        </h1>
        <p className="mb-7 max-w-2xl text-center leading-7 font-medium text-gray-300 [&:not(:first-child)]:mt-6">
          Dapatkan semua file ujian 📚 tiap semester, tiap mata kuliah berupa
          pdf langsung dari kakak-kakak tingkat 🤝, di satu platform. Cukup
          masuk dengan NIM kamu untuk mulai belajar 🚀.
        </p>

        <div className="mt-6 mb-5 flex items-center gap-6">
          <Button className="flex items-center gap-2 bg-gradient-to-r from-sky-700 to-sky-500 px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:from-sky-800 hover:to-sky-600">
            <MdOutlineBookmarkAdd className="text-2xl" />
            Mulai Belajar
          </Button>
          <Button
            variant="secondary"
            className="flex items-center gap-2 border border-sky-700 bg-transparent px-6 py-3 text-sm font-medium text-sky-200 transition hover:bg-sky-900"
          >
            <LuLogIn className="text-2xl" />
            Login dengan NIM
          </Button>
        </div>

        <div className={"mt-7 mb-5 flex items-center gap-4"}>
          <h2 className={"text-sm font-semibold text-gray-100"}>
            Supported by:
          </h2>
          <div className={"flex items-center gap-3"}>
            <Image
              src={
                "https://teknikinformatika.ums.ac.id/wp-content/uploads/sites/57/2022/10/logo-informatika.svg"
              }
              alt={"infor"}
              width={250}
              height={250}
            />
            <Image
              src={
                "https://res.cloudinary.com/airlanggapradana/image/upload/v1755442684/LOGO_FOSTI_PUTIH_imvkxw.png"
              }
              alt={"infor"}
              width={95}
              height={95}
            />
          </div>
        </div>
        <div className={"w-1/2"}>
          <Separator className={"bg-gray-700"} />
        </div>
      </div>
    </div>
  );
}
