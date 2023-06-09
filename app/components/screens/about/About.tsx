import { useInView, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

import Layout from '@/layout/Layout'

import AnimatedText from '@/ui/animated-text/AnimatedText'

import profileImg from '@/assets/images/author_2.png'

import style from './About.module.scss'
import Education from './education/Education'
import Experience from './experience/Experience'
import Skills from './skills/Skills'

type spanRef = HTMLSpanElement & Element
type spanValue = {
	value: number
}
const AnimatedNumber = ({ value }: spanValue) => {
	const ref = useRef<spanRef | null>(null)

	const motionValue = useMotionValue(0)
	const springValue = useSpring(motionValue, { duration: 3000 })
	const isInView = useInView(ref)
	useEffect(() => {
		if (isInView) {
			motionValue.set(value)
		}
	}, [isInView, value, motionValue])
	useEffect(() => {
		springValue.on('change', latest => {
			if (ref.current && latest.toFixed(0) <= value && ref) {
				ref.current.textContent = latest.toFixed(0)
			}
		})
	}, [springValue, value])
	return <span ref={ref}></span>
}

const About = () => {
	return (
		<Layout title='about' description='about me'>
			<div className={`${style.about} dark:text-light`}>
				<h1>
					<AnimatedText
						text='Passion Fuels Purpose!'
						className='text-8xl leading-[90px] font-bold text-dark mb-8 pt-10 text-center lg:!text-7xl lg:pt-5 sm:!mt-0 sm:leading-[70px] sm:!text-6xl xs:!text-4xl xs:leading-[40px] sm:mb-8 xl:text-6xl'
					/>
				</h1>
				<div className={style.content}>
					<div className={style.info}>
						<h2 className='uppercase font-medium text-lg mb-6 text-dark/75 dark:text-light/75'>
							Biography
						</h2>
						<p className='dark:text-light'>
							I am an experienced frontend programmer with more
							than three years of experience. I like to create
							modern, beautiful and functional websites and
							applications using advanced technologies.
						</p>
						<p className='dark:text-light'>
							I have a wide range of skills and knowledge ranging
							from HTML and CSS to JavaScript, React and Next js.
							Ant Design and TailwindCSS to create responsive
							designs for all devices.
						</p>
						<p className='dark:text-light'>
							I am confident in using task builders like Webpack
							to optimize the code and speed up the development
							process. I am also familiar with Git version control
							systems.
						</p>
						<p className='dark:text-light'>
							I strive to create web pages that are not only
							beautiful and functional, but also optimized for
							fast loading and ease of use. I understand the value
							of user experience and am always focused on creating
							websites that make customers happy and satisfied.
						</p>
						<p className='dark:text-light'>
							I am independent, creative and open to new ideas and
							technologies. I am confident in my abilities and
							ready to solve difficult tasks together with the
							team or on my own.
						</p>
					</div>
					<div
						className={`${style.profile} bg-light col-span-3 dark:bg-dark dark:border-light xl:col-span-4 md:col-span-8 md:order-1`}
					>
						<div className='bg-dark  absolute top-0 -right-3 w-[102%] h-[103%] rounded-2xl dark:bg-light -z-10' />
						<Image
							src={profileImg}
							alt='profile'
							priority
							sizes='(max-width:768px) 100vw,
						(max-width:1200px) 50vw,
						33vw'
						/>
					</div>
					<ul>
						<li>
							<span>
								<AnimatedNumber value={3} />+
							</span>
							<h2 className='mb-4 text-xl font-medium capitalize text-dark/75 dark:text-light/75  xl:text-center md:text-lg sm:text-base xs:text-sm'>
								Satisfied Clients
							</h2>
						</li>
						<li>
							<span>
								<AnimatedNumber value={10} />+
							</span>
							<h2 className='mb-4 text-xl font-medium capitalize text-dark/75 dark:text-light/75  xl:text-center md:text-lg sm:text-base xs:text-sm'>
								Projects Completed
							</h2>
						</li>
						<li>
							<span>
								<AnimatedNumber value={3} />+
							</span>
							<h2 className='mb-4 text-xl font-medium capitalize text-dark/75 dark:text-light/75  xl:text-center md:text-lg sm:text-base xs:text-sm'>
								Years Of Experience
							</h2>
						</li>
					</ul>
				</div>
				<Skills />
				<Experience />
				<Education />
			</div>
		</Layout>
	)
}
export default About
