'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { PageLayout } from '../components/PageLayout'
import onboarding1 from './onboarding-1.png'
import onboarding3 from './onboarding-3.png'
import onboarding4 from './onboarding-4.png'

const ONBOARDING_COOKIE = 'onboarding_done'
const COOKIE_MAX_AGE_DAYS = 365

function setOnboardingDone() {
  document.cookie = `${ONBOARDING_COOKIE}=1; path=/; max-age=${COOKIE_MAX_AGE_DAYS * 24 * 60 * 60}; SameSite=Lax`
}

function ArrowLeftIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

export function OnboardingClient() {
  const router = useRouter()
  const [step, setStep] = useState(0)

  useEffect(() => {
    const metaName = 'theme-color'
    let meta = document.querySelector<HTMLMetaElement>(`meta[name="${metaName}"]`)

    if (!meta) {
      meta = document.createElement('meta')
      meta.name = metaName
      document.head.appendChild(meta)
    }

    const rootStyle = getComputedStyle(document.documentElement)
    let color: string

    if (step === 1) {
      color = rootStyle.getPropertyValue('--color-text').trim() || '#1A1A1F'
    } else if (step === 2) {
      color = rootStyle.getPropertyValue('--color-tertiary').trim() || '#63B3B9'
    } else if (step === 3) {
      color = rootStyle.getPropertyValue('--color-surface-elevated').trim() || '#ADDBE2'
    } else {
      color = rootStyle.getPropertyValue('--color-background').trim() || '#000000'
    }

    meta.setAttribute('content', color)
  }, [step])

  function goHome() {
    setOnboardingDone()
    router.push('/')
    router.refresh()
  }

  function goToRegister() {
    setOnboardingDone()
    router.push('/register?from=onboarding')
    router.refresh()
  }

  function handleContinue() {
    if (step < 3) {
      setStep((s) => s + 1)
    } else {
      goHome()
    }
  }

  const showHeaderNav = step > 0
  const isLastStep = step === 3

  return (
    <div className="flex flex-col bg-background text-white lg:min-h-screen lg:items-center lg:justify-center lg:py-8">
      {/* Header: Back, Logo, Skip (screens 2–4); step 1 purple, step 2 teal to match content */}
      {showHeaderNav && (
        <header
          className={`flex shrink-0 items-center justify-between px-4 py-4 ${
            step === 1
              ? 'bg-text'
              : step === 2
                ? 'bg-tertiary'
                : step === 3
                  ? 'bg-surface-elevated'
                  : ''
          }`}
        >
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="flex items-center justify-center p-2 text-white transition-opacity hover:opacity-80"
            aria-label="Back"
          >
            <ArrowLeftIcon />
          </button>
          <span className="text-2xl font-bold tracking-tight text-white">iMGine</span>
          <button
            type="button"
            onClick={goHome}
            className="px-2 py-1 text-sm font-medium text-white transition-opacity hover:opacity-80"
          >
            Skip
          </button>
        </header>
      )}

      {/* Step 0: Welcome – no header nav, logo + welcome + graphic + buttons */}
      {step === 0 && (
        <>
          <div className="flex flex-1 flex-col px-4 pt-4 overflow-x-hidden md:flex-row md:items-center md:justify-between md:px-8 lg:mx-auto lg:w-full lg:max-w-5xl lg:px-12">
            <p className="text-center text-2xl font-bold tracking-tight text-white">iMGine</p>
            <h1 className="mt-4 py-7 text-3xl font-bold leading-tight tracking-tight text-white">
              Hello there,
              <br />
              welcome to iMGine.
            </h1>
            <div className="relative mt-6 h-[300px] md:mt-0 md:h-[360px] lg:h-[420px]">
              <div className="size-20 absolute -left-12 rounded-full bg-text" />
              <div className="absolute left-16 top-20 size-10 rounded-full bg-surface-elevated" />
              <div className="absolute bottom-16 left-12 size-30 rounded-full bg-tertiary z-10" />
              <div className="size-[260px] absolute -right-20 rounded-full overflow-hidden md:size-[300px] lg:size-[340px]">
                <Image
                  src={onboarding1}
                  alt="Hand writing on a notebook"
                  fill
                  className="object-cover absolute"
                />
              </div>
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-3 px-4 pb-10 pt-6 md:flex-row md:items-center md:gap-4 md:px-8 lg:mx-auto lg:w-full lg:max-w-5xl lg:px-12">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full rounded-xl bg-primary py-4 text-lg font-bold text-white transition-opacity hover:opacity-90 md:flex-1"
            >
              Get Started
            </button>
            <Link
              href="/login"
              className="block w-full rounded-xl border-2 border-white/30 py-4 text-center text-lg font-bold text-white transition-opacity hover:opacity-90 md:flex-1"
            >
              Sign In
            </Link>
          </div>
        </>
      )}

      {/* Step 1: Track health – purple theme, chat bubbles, rounded bottom */}
      {step === 1 && (
        <div className="flex flex-1 flex-col overflow-x-hidden">
          <PageLayout
            backgroundColor="var(--color-text)"
            bottomEdge="rounded"
            topMinHeight={260}
            topSection={
              <div className="flex flex-1 flex-col pb-6 relative gap-5">
                <div className="relative z-10">
                  <svg
                    width="160"
                    height="42"
                    viewBox="0 0 160 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M142.475 0C152.14 0 159.975 7.83502 159.975 17.5V24.5C159.975 34.165 152.14 42 142.475 42H21.3768C17.0986 42 13.179 40.4648 10.1388 37.9153C6.6591 40.8303 2.64887 41.6763 0.530901 41.9213C0.0538462 41.9764 -0.178835 41.3701 0.161647 41.0314C1.36177 39.8377 3.14524 37.6272 3.52551 34.7512C3.8463 32.3251 3.90839 28.4206 3.89911 25.391C3.88431 25.0958 3.87682 24.7988 3.87682 24.5V22.9821C3.85837 21.7742 3.83559 21 3.83559 21C3.83559 21 3.84974 21.0151 3.87682 21.0446V17.5C3.87682 7.83502 11.7118 0 21.3768 0H142.475Z"
                      fill="#1A1A1F"
                    />
                  </svg>
                  <span className="absolute left-5 top-2">Is this normal? 😟</span>
                </div>
                <div className="relative z-10">
                  <svg
                    width="218"
                    height="42"
                    viewBox="0 0 218 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17.5 0C7.83501 0 -1.52588e-05 7.83502 -1.52588e-05 17.5V24.5C-1.52588e-05 34.165 7.83499 42 17.5 42H194.939C198.782 42 202.337 40.7608 205.224 38.6602C209.673 41.0052 214.479 41.7145 217.08 41.9286C217.595 41.971 217.809 41.2648 217.393 40.9567C215.763 39.7467 213.424 37.5683 212.917 34.7512C212.488 32.3671 212.399 28.5555 212.408 25.5492C212.428 25.2021 212.439 24.8523 212.439 24.5V22.9805C212.464 21.7734 212.495 21 212.495 21C212.495 21 212.476 21.0151 212.439 21.0445V17.5C212.439 7.83502 204.604 0 194.939 0H17.5Z"
                      fill="#7C5DD8"
                    />
                  </svg>

                  <span className="absolute left-5 top-2">Yes, this is perfectly fine.</span>
                </div>
                <div className="absolute -bottom-10 -right-20 size-64 rounded-full overflow-hidden">
                  <Image
                    src={onboarding1}
                    alt="Hand writing on a notebook"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            }
            bottomSection={
              <div className="mt-16">
                <h2 className="text-center text-xl font-bold leading-tight text-white">
                  Keep track of your health and ask questions to experts.
                </h2>
                <p className="mt-3 text-center leading-relaxed text-white/70">
                  Understand how Myasthenia Gravis affects you by logging and tracking your personal
                  health data.
                </p>
                <div className="mt-6 flex justify-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-white" aria-hidden />
                  <span className="h-2 w-2 rounded-full bg-white/30" aria-hidden />
                  <span className="h-2 w-2 rounded-full bg-white/30" aria-hidden />
                </div>
                <button
                  type="button"
                  onClick={handleContinue}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-4 text-lg font-bold text-white transition-opacity hover:opacity-90"
                >
                  Continue
                  <ArrowRightIcon />
                </button>
              </div>
            }
          />
        </div>
      )}

      {/* Step 2: Community – teal, PageLayout, image bottom-right; header area empty for now */}
      {step === 2 && (
        <div className="flex flex-1 flex-col overflow-x-hidden">
          <PageLayout
            backgroundColor="var(--color-tertiary)"
            bottomEdge="rounded"
            topMinHeight={260}
            topSection={
              <div className="relative flex flex-1 flex-col items-start pb-6 -mt-4">
                <svg
                  width="292"
                  height="88"
                  viewBox="0 0 292 88"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M94 45.427C94 39.9042 98.4772 35.427 104 35.427C109.523 35.427 114 39.9042 114 45.427C114 50.9498 109.523 55.427 104 55.427C98.4772 55.427 94 50.9498 94 45.427Z"
                    fill="white"
                  />
                  <path
                    d="M-83 45.427H48.486C63.9417 45.427 78.8463 39.6851 90.3072 29.3157C98.0967 22.2681 110.037 22.304 117.882 29.2904C129.474 39.615 144.577 45.427 160.101 45.427H292"
                    stroke="white"
                    stroke-width="2"
                  />
                  <path
                    d="M102.645 1.0285C102.645 1.32883 102.549 1.5725 102.356 1.7595C102.169 1.9465 101.855 2.04 101.413 2.04H98.0297L97.5877 4.607C98.143 4.49367 98.6502 4.437 99.1092 4.437C99.7552 4.437 100.322 4.53333 100.809 4.726C101.302 4.91867 101.716 5.185 102.05 5.525C102.385 5.865 102.637 6.2645 102.807 6.7235C102.977 7.17684 103.062 7.667 103.062 8.194C103.062 8.84567 102.946 9.44067 102.713 9.979C102.487 10.5173 102.169 10.9792 101.761 11.3645C101.353 11.7442 100.869 12.0388 100.308 12.2485C99.7523 12.4582 99.146 12.563 98.4887 12.563C98.1033 12.563 97.7378 12.5233 97.3922 12.444C97.0465 12.3647 96.7207 12.2598 96.4147 12.1295C96.1143 11.9935 95.8338 11.8405 95.5732 11.6705C95.3182 11.4948 95.0887 11.3107 94.8847 11.118L95.5307 10.2255C95.6667 10.0328 95.848 9.9365 96.0747 9.9365C96.2163 9.9365 96.358 9.98184 96.4997 10.0725C96.647 10.1632 96.817 10.2623 97.0097 10.37C97.2023 10.4777 97.4262 10.5768 97.6812 10.6675C97.9362 10.7582 98.245 10.8035 98.6077 10.8035C98.993 10.8035 99.333 10.7412 99.6277 10.6165C99.9223 10.4918 100.166 10.319 100.359 10.098C100.557 9.87134 100.704 9.605 100.801 9.299C100.903 8.98734 100.954 8.65017 100.954 8.2875C100.954 7.61884 100.758 7.0975 100.367 6.7235C99.9818 6.34384 99.4123 6.154 98.6587 6.154C98.0637 6.154 97.4658 6.26167 96.8652 6.477L95.5562 6.103L96.5762 0.136001H102.645V1.0285ZM113.935 6.2815C113.935 7.3525 113.819 8.28467 113.587 9.078C113.36 9.86567 113.043 10.5173 112.635 11.033C112.232 11.5487 111.753 11.934 111.198 12.189C110.648 12.4383 110.053 12.563 109.413 12.563C108.773 12.563 108.178 12.4383 107.628 12.189C107.084 11.934 106.611 11.5487 106.209 11.033C105.806 10.5173 105.492 9.86567 105.265 9.078C105.038 8.28467 104.925 7.3525 104.925 6.2815C104.925 5.20483 105.038 4.27267 105.265 3.485C105.492 2.69733 105.806 2.04567 106.209 1.53C106.611 1.01433 107.084 0.631835 107.628 0.382501C108.178 0.127502 108.773 1.84774e-06 109.413 1.84774e-06C110.053 1.84774e-06 110.648 0.127502 111.198 0.382501C111.753 0.631835 112.232 1.01433 112.635 1.53C113.043 2.04567 113.36 2.69733 113.587 3.485C113.819 4.27267 113.935 5.20483 113.935 6.2815ZM111.768 6.2815C111.768 5.39183 111.702 4.65517 111.572 4.0715C111.442 3.48783 111.266 3.02317 111.045 2.6775C110.83 2.33183 110.58 2.091 110.297 1.955C110.014 1.81333 109.719 1.7425 109.413 1.7425C109.113 1.7425 108.821 1.81333 108.538 1.955C108.26 2.091 108.013 2.33183 107.798 2.6775C107.583 3.02317 107.41 3.48783 107.28 4.0715C107.155 4.65517 107.093 5.39183 107.093 6.2815C107.093 7.17117 107.155 7.90783 107.28 8.4915C107.41 9.07517 107.583 9.53984 107.798 9.8855C108.013 10.2312 108.26 10.4748 108.538 10.6165C108.821 10.7525 109.113 10.8205 109.413 10.8205C109.719 10.8205 110.014 10.7525 110.297 10.6165C110.58 10.4748 110.83 10.2312 111.045 9.8855C111.266 9.53984 111.442 9.07517 111.572 8.4915C111.702 7.90783 111.768 7.17117 111.768 6.2815Z"
                    fill="white"
                  />
                  <path
                    opacity="0.7"
                    d="M250.32 19.132H252.371V13.231C252.371 13.0023 252.378 12.762 252.392 12.51L250.936 13.728C250.875 13.7793 250.812 13.8143 250.747 13.833C250.686 13.8517 250.625 13.861 250.565 13.861C250.471 13.861 250.385 13.8423 250.306 13.805C250.231 13.763 250.175 13.7163 250.138 13.665L249.592 12.916L252.679 10.291H254.1V19.132H255.92V20.427H250.32V19.132ZM264.728 15.366C264.728 16.248 264.632 17.0157 264.441 17.669C264.254 18.3177 263.993 18.8543 263.657 19.279C263.325 19.7037 262.931 20.021 262.474 20.231C262.021 20.4363 261.531 20.539 261.004 20.539C260.476 20.539 259.986 20.4363 259.534 20.231C259.086 20.021 258.696 19.7037 258.365 19.279C258.033 18.8543 257.774 18.3177 257.588 17.669C257.401 17.0157 257.308 16.248 257.308 15.366C257.308 14.4793 257.401 13.7117 257.588 13.063C257.774 12.4143 258.033 11.8777 258.365 11.453C258.696 11.0283 259.086 10.7133 259.534 10.508C259.986 10.298 260.476 10.193 261.004 10.193C261.531 10.193 262.021 10.298 262.474 10.508C262.931 10.7133 263.325 11.0283 263.657 11.453C263.993 11.8777 264.254 12.4143 264.441 13.063C264.632 13.7117 264.728 14.4793 264.728 15.366ZM262.943 15.366C262.943 14.6333 262.889 14.0267 262.782 13.546C262.674 13.0653 262.53 12.6827 262.348 12.398C262.17 12.1133 261.965 11.915 261.732 11.803C261.498 11.6863 261.256 11.628 261.004 11.628C260.756 11.628 260.516 11.6863 260.283 11.803C260.054 11.915 259.851 12.1133 259.674 12.398C259.496 12.6827 259.354 13.0653 259.247 13.546C259.144 14.0267 259.093 14.6333 259.093 15.366C259.093 16.0987 259.144 16.7053 259.247 17.186C259.354 17.6667 259.496 18.0493 259.674 18.334C259.851 18.6187 260.054 18.8193 260.283 18.936C260.516 19.048 260.756 19.104 261.004 19.104C261.256 19.104 261.498 19.048 261.732 18.936C261.965 18.8193 262.17 18.6187 262.348 18.334C262.53 18.0493 262.674 17.6667 262.782 17.186C262.889 16.7053 262.943 16.0987 262.943 15.366ZM273.249 15.366C273.249 16.248 273.153 17.0157 272.962 17.669C272.775 18.3177 272.514 18.8543 272.178 19.279C271.847 19.7037 271.452 20.021 270.995 20.231C270.542 20.4363 270.052 20.539 269.525 20.539C268.998 20.539 268.508 20.4363 268.055 20.231C267.607 20.021 267.217 19.7037 266.886 19.279C266.555 18.8543 266.296 18.3177 266.109 17.669C265.922 17.0157 265.829 16.248 265.829 15.366C265.829 14.4793 265.922 13.7117 266.109 13.063C266.296 12.4143 266.555 11.8777 266.886 11.453C267.217 11.0283 267.607 10.7133 268.055 10.508C268.508 10.298 268.998 10.193 269.525 10.193C270.052 10.193 270.542 10.298 270.995 10.508C271.452 10.7133 271.847 11.0283 272.178 11.453C272.514 11.8777 272.775 12.4143 272.962 13.063C273.153 13.7117 273.249 14.4793 273.249 15.366ZM271.464 15.366C271.464 14.6333 271.41 14.0267 271.303 13.546C271.196 13.0653 271.051 12.6827 270.869 12.398C270.692 12.1133 270.486 11.915 270.253 11.803C270.02 11.6863 269.777 11.628 269.525 11.628C269.278 11.628 269.037 11.6863 268.804 11.803C268.575 11.915 268.372 12.1133 268.195 12.398C268.018 12.6827 267.875 13.0653 267.768 13.546C267.665 14.0267 267.614 14.6333 267.614 15.366C267.614 16.0987 267.665 16.7053 267.768 17.186C267.875 17.6667 268.018 18.0493 268.195 18.334C268.372 18.6187 268.575 18.8193 268.804 18.936C269.037 19.048 269.278 19.104 269.525 19.104C269.777 19.104 270.02 19.048 270.253 18.936C270.486 18.8193 270.692 18.6187 270.869 18.334C271.051 18.0493 271.196 17.6667 271.303 17.186C271.41 16.7053 271.464 16.0987 271.464 15.366Z"
                    fill="white"
                  />
                </svg>
                <span className="rounded-md bg-[#91DCCD] text-white py-3 px-4 flex items-center gap-2 z-10 font-bold text-lg">
                  Share with others{' '}
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="22" height="22" fill="white" fill-opacity="0.01" />
                    <mask
                      id="mask0_24_3981"
                      maskUnits="userSpaceOnUse"
                      x="1"
                      y="1"
                      width="20"
                      height="20"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.8333 5.5C12.8333 5.76347 12.861 6.02046 12.9138 6.26818L8.26545 8.59238C7.59325 7.8209 6.60352 7.33333 5.49992 7.33333C3.47487 7.33333 1.83325 8.97496 1.83325 11C1.83325 13.025 3.47487 14.6667 5.49992 14.6667C6.60352 14.6667 7.59325 14.1791 8.26545 13.4076L12.9138 15.7318C12.861 15.9795 12.8333 16.2365 12.8333 16.5C12.8333 18.525 14.4749 20.1667 16.4999 20.1667C18.525 20.1667 20.1666 18.525 20.1666 16.5C20.1666 14.475 18.525 12.8333 16.4999 12.8333C15.3963 12.8333 14.4066 13.3209 13.7344 14.0924L9.08599 11.7682C9.1388 11.5205 9.16658 11.2635 9.16658 11C9.16658 10.7365 9.1388 10.4796 9.08599 10.2318L13.7344 7.90763C14.4066 8.67911 15.3963 9.16667 16.4999 9.16667C18.525 9.16667 20.1666 7.52504 20.1666 5.5C20.1666 3.47496 18.525 1.83333 16.4999 1.83333C14.4749 1.83333 12.8333 3.47496 12.8333 5.5ZM7.33325 11C7.33325 12.0125 6.51244 12.8333 5.49991 12.8333C4.48739 12.8333 3.66658 12.0125 3.66658 11C3.66658 9.98748 4.48739 9.16667 5.49991 9.16667C6.51244 9.16667 7.33325 9.98748 7.33325 11ZM16.4999 7.33333C17.5124 7.33333 18.3332 6.51252 18.3332 5.5C18.3332 4.48748 17.5124 3.66667 16.4999 3.66667C15.4874 3.66667 14.6666 4.48748 14.6666 5.5C14.6666 6.51252 15.4874 7.33333 16.4999 7.33333ZM18.3332 16.5C18.3332 17.5125 17.5124 18.3333 16.4999 18.3333C15.4874 18.3333 14.6666 17.5125 14.6666 16.5C14.6666 15.4875 15.4874 14.6667 16.4999 14.6667C17.5124 14.6667 18.3332 15.4875 18.3332 16.5Z"
                        fill="white"
                      />
                    </mask>
                    <g mask="url(#mask0_24_3981)">
                      <rect width="22" height="22" fill="white" />
                    </g>
                  </svg>
                </span>
                <div className="absolute -bottom-4 -right-12 size-64 overflow-hidden rounded-full">
                  <Image src={onboarding3} alt="" fill className="object-cover object-bottom" />
                </div>
              </div>
            }
            bottomSection={
              <div className="mt-10">
                <h2 className="text-center text-xl font-bold leading-tight text-white">
                  Exchange information and talk to people in the community.
                </h2>
                <p className="mt-3 text-center text-sm leading-relaxed text-white/80">
                  Gain a better understanding of Myasthenia Gravis by sharing experiences and
                  questions with experts and peers in the community.
                </p>
                <div className="mt-6 flex justify-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-white/30" aria-hidden />
                  <span className="h-2 w-2 rounded-full bg-white" aria-hidden />
                  <span className="h-2 w-2 rounded-full bg-white/30" aria-hidden />
                </div>
                <button
                  type="button"
                  onClick={handleContinue}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-surface-elevated py-4 text-lg font-bold text-white transition-opacity hover:opacity-90"
                >
                  Continue
                  <ArrowRightIcon />
                </button>
              </div>
            }
          />
        </div>
      )}

      {/* Step 3: Research – teal, PageLayout, image bottom-right; header content empty for now */}
      {step === 3 && (
        <div className="flex flex-1 flex-col overflow-x-hidden">
          <PageLayout
            backgroundColor="var(--color-surface-elevated)"
            bottomEdge="rounded"
            topMinHeight={260}
            topSection={
              <div className="relative flex flex-1 items-start flex-col pb-6 pt-16">
                <span className="rounded-[100px] bg-[#ADDBE2] text-white py-3 px-4 flex items-center gap-2 z-10 font-bold text-lg">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="20" cy="20" r="20" fill="#63B3B9" />
                    <rect x="10" y="10" width="20" height="20" fill="white" fill-opacity="0.01" />
                    <mask
                      id="mask0_24_3980"
                      maskUnits="userSpaceOnUse"
                      x="10"
                      y="10"
                      width="20"
                      height="20"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10 20C10 25.5228 14.4772 30 20 30C25.5228 30 30 25.5228 30 20C30 14.4772 25.5228 10 20 10C14.4772 10 10 14.4772 10 20ZM27.5 20C27.5 24.1421 24.1421 27.5 20 27.5C15.8579 27.5 12.5 24.1421 12.5 20C12.5 15.8579 15.8579 12.5 20 12.5C24.1421 12.5 27.5 15.8579 27.5 20ZM21.2545 23.7479H18.7537V18.7479H21.2545V23.7479ZM21.2508 16.2479C21.2508 16.9383 20.691 17.4979 20.0004 17.4979C19.3098 17.4979 18.75 16.9383 18.75 16.2479C18.75 15.5576 19.3098 14.9979 20.0004 14.9979C20.691 14.9979 21.2508 15.5576 21.2508 16.2479Z"
                        fill="white"
                      />
                    </mask>
                    <g mask="url(#mask0_24_3980)">
                      <rect x="10" y="10" width="20" height="20" fill="white" />
                    </g>
                  </svg>
                  New drug for MG
                </span>
                <div className="absolute -bottom-8 -right-10 size-64 overflow-hidden md:size-80 rounded-full">
                  <Image src={onboarding4} alt="" fill className="object-cover object-bottom" />
                </div>
              </div>
            }
            bottomSection={
              <div className="mt-12">
                <h2 className="text-center text-xl font-bold leading-tight text-white">
                  Contribute to research by sharing anonymized data with researchers.
                </h2>
                <p className="mt-3 text-center text-sm leading-relaxed text-white/80">
                  Contribute to improve clinical research and development and opt-in to donate your
                  anonymized health data for scientific purposes.
                </p>
                <div className="mt-6 flex justify-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-white/30" aria-hidden />
                  <span className="h-2 w-2 rounded-full bg-white/30" aria-hidden />
                  <span className="h-2 w-2 rounded-full bg-white" aria-hidden />
                </div>
                <button
                  type="button"
                  onClick={goToRegister}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-lg font-bold text-white transition-opacity hover:opacity-90"
                >
                  Get Started
                  <ArrowRightIcon />
                </button>
              </div>
            }
          />
        </div>
      )}
    </div>
  )
}
