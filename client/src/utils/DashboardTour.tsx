import type { Tour } from "nextstepjs";

export const steps: Tour[] = [
  {
    tour: "uploadxam-tour",
    steps: [
      {
        icon: <>🎓</>,
        title: "Filter berdasarkan Prodi",
        content: (
          <>Pilih Prodi dari dropdown untuk memfilter data pada dashboard.</>
        ),
        selector: "#tour1-step1",
        side: "top",
        showControls: true,
        showSkip: true,
        pointerPadding: 10,
        pointerRadius: 10,
      },
      {
        icon: <>🎉</>,
        title: "Search Soal Ujian",
        content: <>Cari nama soal tertentu berdasarkan nama mata kuliahnya</>,
        selector: "#tour1-step2",
        side: "top",
        showControls: true,
        showSkip: true,
        pointerPadding: 10,
        pointerRadius: 10,
      },
      {
        icon: <>🎉</>,
        title: "Upload Soal Ujian",
        content: (
          <>
            Klik tombol ini untuk turut berkontribusi pada bank soal kita,
            dengan mengupload file pdf yaa!
          </>
        ),
        selector: "#tour1-step3",
        side: "left",
        showControls: true,
        showSkip: true,
        pointerPadding: 10,
        pointerRadius: 10,
      },
      {
        icon: <>🎉</>,
        title: "Data Statistik Soal Ujian",
        content: (
          <>
            Disini terdapat informasi mengenai jumlah soal yang telah di upload
            dari setiap prodi
          </>
        ),
        selector: "#tour1-step4",
        side: "top",
        showControls: true,
        showSkip: true,
        pointerPadding: 10,
        pointerRadius: 10,
      },
      {
        icon: <>🎉</>,
        title: "Kumpulan Soal berdasarkan prodi",
        content: (
          <>
            Disinilah kamu dapat menemukan soal-soal ujian dari semester
            berapapun itu
          </>
        ),
        selector: "#tour1-step5",
        side: "top",
        showControls: true,
        showSkip: true,
        pointerPadding: 10,
        pointerRadius: 10,
      },
      {
        icon: <>🎉</>,
        title: "Pantau Aktivitas Terbaru",
        content: (
          <>
            Lihat aktivitas terbaru di platform dalam 12 jam terakhir di sini.
          </>
        ),
        selector: "#tour1-step6",
        side: "top",
        showControls: true,
        showSkip: true,
        pointerPadding: 10,
        pointerRadius: 10,
      },
    ],
  },
];
