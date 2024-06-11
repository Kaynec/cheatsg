<template>
  <div class="flex flex-col my-3xl">
    <div class="flex items-center pb-2 gap-2">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.5073 20.0129L12.1339 18.6395L13.4539 17.3195C13.8406 16.9329 13.8406 16.2929 13.4539 15.9062C13.0673 15.5195 12.4273 15.5195 12.0406 15.9062L10.7206 17.2262L9.4406 15.9462C9.05393 15.5595 8.41393 15.5595 8.02727 15.9462C7.6406 16.3329 7.6406 16.9729 8.02727 17.3595L9.30727 18.6395L7.98727 19.9595C7.6006 20.3462 7.6006 20.9862 7.98727 21.3729C8.18727 21.5729 8.4406 21.6662 8.69393 21.6662C8.94727 21.6662 9.2006 21.5729 9.4006 21.3729L10.7206 20.0529L12.0939 21.4262C12.2939 21.6262 12.5473 21.7195 12.8006 21.7195C13.0539 21.7195 13.3073 21.6262 13.5073 21.4262C13.8939 21.0395 13.8939 20.3995 13.5073 20.0129Z"
          fill="#007AFF"
        />
        <path
          d="M18.0537 19.9997C17.3204 19.9997 16.707 19.3997 16.707 18.6663C16.707 17.933 17.2937 17.333 18.027 17.333H18.0537C18.787 17.333 19.387 17.933 19.387 18.6663C19.387 19.3997 18.8004 19.9997 18.0537 19.9997Z"
          fill="#007AFF"
        />
        <path
          d="M23.3076 19.9997C22.5743 19.9997 21.9609 19.3997 21.9609 18.6663C21.9609 17.933 22.5476 17.333 23.2809 17.333H23.3076C24.0409 17.333 24.6409 17.933 24.6409 18.6663C24.6409 19.3997 24.0543 19.9997 23.3076 19.9997Z"
          fill="#007AFF"
        />
        <path
          d="M20.6673 22.6263C19.934 22.6263 19.334 22.0396 19.334 21.3063V21.2796C19.334 20.5463 19.934 19.9463 20.6673 19.9463C21.4007 19.9463 22.0007 20.5463 22.0007 21.2796C22.0007 22.013 21.414 22.6263 20.6673 22.6263Z"
          fill="#007AFF"
        />
        <path
          d="M20.6673 17.3734C19.934 17.3734 19.334 16.7867 19.334 16.0534V16.0267C19.334 15.2934 19.934 14.6934 20.6673 14.6934C21.4007 14.6934 22.0007 15.2934 22.0007 16.0267C22.0007 16.76 21.414 17.3734 20.6673 17.3734Z"
          fill="#007AFF"
        />
        <path
          opacity="0.4"
          d="M29.3327 14.7603V22.2003C29.3327 26.1336 26.1327 29.3336 22.1993 29.3336H9.79935C5.86602 29.3336 2.66602 26.1336 2.66602 22.2003V14.7603C2.66602 10.827 5.86602 7.62695 9.79935 7.62695H22.1993C26.1327 7.62695 29.3327 10.827 29.3327 14.7603Z"
          fill="#007AFF"
        />
        <path
          d="M18.1858 3.61366L18.1725 4.86699C18.1592 6.04033 17.1858 7.01366 15.9992 7.01366C15.7992 7.01366 15.6792 7.14699 15.6792 7.32032C15.6792 7.49366 15.8125 7.62699 15.9858 7.62699H13.8392C13.8258 7.53366 13.8125 7.42699 13.8125 7.32032C13.8125 6.12033 14.7858 5.14699 15.9725 5.14699C16.1725 5.14699 16.3058 5.01366 16.3058 4.84033L16.3192 3.58699C16.3325 3.08033 16.7458 2.66699 17.2525 2.66699H17.2658C17.7858 2.66699 18.1858 3.09366 18.1858 3.61366Z"
          fill="#007AFF"
        />
      </svg>

      <h2 class="text-2xl text-text-primary font-600">خدمات ما</h2>
    </div>
    <p class="text-text-secondary text_sm pb-4">
      شما با انتخاب یکی از این سه خدمت کلیدی میتوانید دسترسی سریع تری به بخش
      مدنظر خود داشته باشید
    </p>
    <div class="row q-col-gutter-md">
      <div class="col-12 col-sm-6 col-md-4">
        <QCard
          :class="{ noisy: $q.dark.isActive }"
          class="bg-background-primary cursor-pointer pa-sm flex flex-col border-1 border-border-primary gap-1 lg:gap-3"
        >
          <div class="flex items-center justify-start gap-1">
            <NuxtImg
              src="/images/home_imgs/cards/ps5.svg"
              class="mix-blend-difference"
              width="50"
              height="50"
              format="webp"
              quality="35"
              loading="lazy"
              alt="ps5 card image"
            />
            <h3 class="text_xl text-text-primary font-600">
              خرید کنسول و لوازم جانبی
            </h3>
          </div>
          <p class="text-text-secondary text-xs">
            و لوازم جانبی آن میتواند تجربه‌ای هیجان انگیز باشد. این کنسول نسل
            جدیدی از سری PlayStation است که توانایی‌های گرافیکی و ...
          </p>
          <NuxtLink
            class="inline-flex flex-row-reverse mt-auto justify-end gap-2 items-center text-blue-7"
            :to="{ name: 'Products' }"
          >
            <LinkIcon />

            <span> مشاهده محصولات </span>
          </NuxtLink>
        </QCard>
      </div>
      <div class="col-12 col-sm-6 col-md-4">
        <QCard
          :class="{ noisy: $q.dark.isActive }"
          class="bg-background-primary cursor-pointer pa-sm flex flex-col h-full border-1 border-border-primary gap-1 lg:gap-3"
        >
          <div class="flex items-center justify-start gap-1">
            <NuxtImg
              src="/images/home_imgs/cards/controller.png"
              width="50"
              height="50"
              loading="lazy"
              alt="ps5 card image"
            />
            <h3 class="text_xl text-text-primary font-600">
              تعمیرات و تست دسته
            </h3>
          </div>
          <p class="text-text-secondary text-xs">
            و لوازم جانبی آن میتواند تجربه‌ای هیجان انگیز باشد. این کنسول نسل
            جدیدی از سری PlayStation است که توانایی‌های گرافیکی و ...
          </p>
          <NuxtLink
            class="inline-flex flex-row-reverse mt-auto justify-end gap-2 items-center text-blue-7"
            :to="{ name: 'Repair' }"
          >
            <LinkIcon />

            <span> مشاهده محصولات </span>
          </NuxtLink>
        </QCard>
      </div>
      <div class="col-12 col-sm-6 col-md-4">
        <!-- TODO go to game  -->
        <QCard
          :class="{ noisy: $q.dark.isActive }"
          class="bg-background-primary cursor-pointer pa-sm flex flex-col h-full border-1 border-border-primary"
        >
          <div class="flex items-center justify-start gap-1">
            <NuxtImg
              src="/images/home_imgs/cards/fortnite.png"
              width="50"
              height="50"
              loading="lazy"
              alt="ps5 card image"
            />
            <h3 class="text_xl text-text-primary font-600">نصب بازی</h3>
          </div>
          <p class="text-text-secondary text-xs">
            و لوازم جانبی آن میتواند تجربه‌ای هیجان انگیز باشد. این کنسول نسل
            جدیدی از سری PlayStation است که توانایی‌های گرافیکی و ...
          </p>
          <NuxtLink
            class="inline-flex flex-row-reverse mt-auto justify-end gap-2 items-center text-blue-7"
            :to="{ name: 'Game' }"
          >
            <LinkIcon />

            <span> مشاهده محصولات </span>
          </NuxtLink>
        </QCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.noisy {
  background: url(@/assets/home_imgs/cards/grain.svg?inline) !important;
  background-position: 10% !important;
  background-size: cover !important;
  border-radius: 0.7rem;
  box-shadow: none;
}
</style>
