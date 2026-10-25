/**
 * همه‌ی متن‌ها و تنظیمات قابل تغییر سایت در این فایل است.
 *
 * - فال حافظ: stageThree.fortune.hafez (غزل، تعبیر و عنوان‌ها).
 * - پیام پایانی: stageThree.finalMessage.
 * - عکس: فایل را در public/images/our-photo.jpg بگذار.
 * - ویس: فایل را در public/audio/our-voice.mp3 بگذار.
 */

export interface Couplet {
  /** the two verses of one bayt, in reading order */
  lines: [string, string];
  /** 'ar' for Arabic verses, so they are set in the right direction */
  lang: 'fa' | 'ar';
}

export interface LoveContent {
  name: string;
  heartLetters: string[];
  stageOne: {
    questionIntro: string;
    questionMain: string;
    yesLabel: string;
    noLabel: string;
  };
  stageTwo: {
    title: string;
    subtitle: string;
    placeholder: string;
    nextLabel: string;
    emptyHint: string;
    backLabel: string;
    maxLength: number;
  };
  stageThree: {
    title: string;
    backLabel: string;
    restartLabel: string;
    photo: {
      src: string;
      alt: string;
      title: string;
      placeholderText: string;
      loadingText: string;
      downloadLabel: string;
      downloadFileName: string;
    };
    audio: {
      src: string;
      title: string;
      missingHint: string;
    };
    fortune: {
      title: string;
      revealLabel: string;
      showFullLabel: string;
      hafez: {
        sectionTitle: string;
        poemTitle: string;
        couplets: Couplet[];
        interpretationTitle: string;
        interpretation: string;
      };
    };
    finalMessage: string;
  };
}

export const LOVE_CONTENT: LoveContent = {
  name: 'YASINA',
  heartLetters: ['Y', 'A', 'S', 'I', 'N', 'A'],

  stageOne: {
    questionIntro: 'یه سؤال کوچولو ازت دارم...',
    questionMain: 'دوستم داری؟ ❤️',
    yesLabel: 'آره، خیلی!',
    noLabel: 'نه!',
  },

  stageTwo: {
    title: 'می‌دونی امروز چه روزیه؟ 💌',
    subtitle: 'یه چیزی هست که دوست دارم از زبون خودت بشنوم...',
    placeholder: 'جوابت رو اینجا بنویس…',
    nextLabel: 'بریم مرحله بعد ❤️',
    emptyHint: 'اول یه چیزی بنویس، بعد بریم جلو 💕',
    backLabel: '→ مرحله قبل',
    maxLength: 500,
  },

  stageThree: {
    title: 'سورپرایز مخصوص تو 🎉',
    backLabel: '→ مرحله قبل',
    restartLabel: 'شروع دوباره از اول',

    photo: {
      src: 'images/our-photo.jpg',
      alt: 'عکس اختصاصی ما',
      title: 'عکس اختصاصی ما',
      placeholderText: 'عکس اختصاصی را اینجا قرار بده',
      loadingText: 'در حال بارگذاری عکس…',
      downloadLabel: 'دانلود عکس ⬇️',
      downloadFileName: 'yasina-our-photo.jpg',
    },

    audio: {
      src: 'audio/our-voice.mp3',
      title: 'پیام صوتی ما 🎙️',
      missingHint:
        'فایل صوتی پیدا نشد. فایل را با نام our-voice.mp3 داخل پوشه public/audio بگذار و صفحه را دوباره باز کن.',
    },

    fortune: {
      title: 'یه فال برای ما... 🌹',
      revealLabel: 'گرفتن فال حافظ',
      showFullLabel: 'نمایش کامل',

      hafez: {
        sectionTitle: 'فال حافظ',
        poemTitle: 'غزل حافظ: هزار دشمنم ار می‌کنند قصد هلاک',
        couplets: [
          {
            lang: 'fa',
            lines: ['هزار دشمنم ار می‌کنند قصد هلاک', 'گرم تو دوستی از دشمنان ندارم باک'],
          },
          {
            lang: 'fa',
            lines: ['مرا امید وصال تو زنده می‌دارد', 'و گر نه هر دمم از هجر توست بیم هلاک'],
          },
          {
            lang: 'fa',
            lines: ['نفس نفس اگر از باد نشنوم بویش', 'زمان زمان چو گل از غم کنم گریبان چاک'],
          },
          {
            lang: 'fa',
            lines: ['رود به خواب دو چشم از خیال تو هیهات', 'بود صبور دل اندر فراق تو حاشاک'],
          },
          {
            lang: 'fa',
            lines: ['اگر تو زخم زنی به که دیگری مرهم', 'و گر تو زهر دهی به که دیگری تریاک'],
          },
          {
            lang: 'ar',
            lines: ['بضرب سیفک قتلی حیاتنا ابدا', 'لأن روحی قد طاب أن یکون فداک'],
          },
          {
            lang: 'fa',
            lines: ['عنان مپیچ که گر می‌زنی به شمشیرم', 'سپر کنم سر و دستت ندارم از فتراک'],
          },
          {
            lang: 'fa',
            lines: ['تو را چنان که تویی هر نظر کجا بیند', 'به قدر دانش خود هر کسی کند ادراک'],
          },
          {
            lang: 'fa',
            lines: ['به چشم خلق عزیز جهان شود حافظ', 'که بر در تو نهد روی مسکنت بر خاک'],
          },
        ],
        interpretationTitle: 'تعبیر فال شما',
        interpretation:
          'ای صاحب فال: اگر تو واقعاً و از سر صدق، دل به کسی سپرده‌ای بدان که او از هیچ چیز نخواهد هراسید و برای رسیدن به تو، هر مشکلی را تحمل خواهد کرد. او به شوق وصال تو زنده است و فراق تو خواب از چشمانش ربوده. او در مقابل ستم‌های تو لب به شکوه نمی‌گشاید چرا که تو را در حدی بسیار بالاتر از آن می‌داند که بخواهد گلایه‌ای هم داشته باشد. روی از او برمگردان و وی را عزیز و محترم بدار.',
      },
    },

    finalMessage: 'با تمام وجودم دوستت دارم. ماهگردمون رو بهت تبریک می‌گم، عزیزم. ❤️',
  },
};
