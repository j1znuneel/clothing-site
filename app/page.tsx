"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, Menu, Search, User, Heart, ArrowRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, type Variants } from "framer-motion"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const collectionsRef = useRef<HTMLDivElement>(null)
  const newArrivalsRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Variants for animations
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const staggerChildren: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  // Scroll animations
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroOpacity = useTransform(heroScrollProgress, [0, 1], [1, 0])
  const heroScale = useTransform(heroScrollProgress, [0, 1], [1, 0.9])
  const heroY = useTransform(heroScrollProgress, [0, 1], [0, 100])

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Grain overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-30"
        style={{ backgroundImage: "url('/grain.png')" }}
      />

      {/* Navbar */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrollY > 50 ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/" className="font-bold text-2xl tracking-widest uppercase">
              milwauky
            </Link>
          </motion.div>

          <div className="flex items-center gap-4">
            {["user", "heart", "bag"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * (i + 1) }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="ghost" size="icon" className="rounded-full relative">
                  {item === "user" && <User className="h-5 w-5" />}
                  {item === "heart" && <Heart className="h-5 w-5" />}
                  {item === "bag" && (
                    <>
                      <ShoppingBag className="h-5 w-5" />
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, delay: 0.5 }}
                        className="absolute top-0 right-0 h-4 w-4 rounded-full bg-black text-[10px] font-medium text-white flex items-center justify-center"
                      >
                        3
                      </motion.span>
                    </>
                  )}
                  <span className="sr-only">{item}</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.header>

      <main>
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
        >
          {/* Background text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 0.1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute -left-10 top-40 -rotate-90 text-[200px] font-bold tracking-tighter"
          >
            MILWAUKY
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 0.1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute -right-10 bottom-40 -rotate-90 text-[200px] font-bold tracking-tighter"
          >
            STYLE
          </motion.div>

          <div className="container relative z-10 px-4 md:px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="space-y-6 lg:col-span-1"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "6rem" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-1 bg-black"
              ></motion.div>
              <motion.h2 variants={fadeInUp} className="text-xl md:text-2xl font-light uppercase tracking-widest">
                New Collection
              </motion.h2>
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
                BOLD
                <br />
                MODERN
                <br />
                ESSENTIAL
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-zinc-500">
                Redefining contemporary fashion with minimalist designs and premium materials.
              </motion.p>
              <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="rounded-none px-8 py-6 group">
                  Explore Collection
                  <motion.div initial={{ x: 0 }} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="lg:col-span-1 relative h-[70vh] max-h-[800px]"
            >
              <Image
                src="/placeholder.svg?height=1200&width=800"
                alt="Fashion model wearing milwauky clothing"
                className="object-cover object-center"
                fill
                priority
              />
              <motion.div
                initial={{ opacity: 0, y: 20, x: 20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-10 -right-10 bg-black text-white p-6 w-40 h-40 flex items-center justify-center text-center"
              >
                <p className="text-sm font-light">Limited edition pieces available now</p>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="space-y-6 lg:col-span-1"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "6rem" }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="h-1 bg-black"
              ></motion.div>
              <motion.h2 variants={fadeInUp} className="text-xl md:text-2xl font-light uppercase tracking-widest">
                Sustainable
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-zinc-500">
                Our commitment to ethical fashion and sustainable practices defines every piece we create.
              </motion.p>
              <motion.div variants={fadeInUp} className="pt-10">
                <p className="text-sm uppercase tracking-widest mb-2">Scroll to explore</p>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                >
                  <ChevronDown className="h-6 w-6" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Floating elements */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 4,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-10 w-20 h-20 rounded-full border border-black opacity-20"
          ></motion.div>
          <motion.div
            animate={{
              rotate: [0, 360],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 20,
              ease: "linear",
            }}
            className="absolute bottom-1/4 right-10 w-40 h-40 rounded-full border-2 border-black opacity-20"
          ></motion.div>
        </motion.section>

        {/* Collections Section */}
        <section ref={collectionsRef} className="py-24 md:py-32 relative overflow-hidden">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex flex-col items-start space-y-4 mb-16"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "6rem" }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="h-1 bg-black"
              ></motion.div>
              <div className="flex justify-between w-full items-end">
                <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold tracking-tighter">
                  Collections
                </motion.h2>
                <motion.p variants={fadeInUp} className="max-w-[400px] text-zinc-500">
                  Explore our curated collections designed for the modern individual.
                </motion.p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                { name: "Essentials", desc: "Timeless basics" },
                { name: "Avant-garde", desc: "Bold statements" },
                { name: "Minimalist", desc: "Less is more" },
              ].map((category, i) => (
                <motion.div
                  key={category.name}
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  className="group relative overflow-hidden"
                >
                  <div className="aspect-[3/4] w-full overflow-hidden">
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.7 }} className="h-full w-full">
                      <Image
                        src={`/placeholder.svg?height=900&width=600&text=${category.name}`}
                        alt={category.name}
                        className="object-cover"
                        fill
                      />
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/60 via-black/30 to-transparent"
                  >
                    <motion.h3
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="text-3xl font-bold text-white"
                    >
                      {category.name}
                    </motion.h3>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="text-white/80"
                    >
                      {category.desc}
                    </motion.p>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <Button
                        variant="outline"
                        className="mt-4 bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors rounded-none w-fit"
                      >
                        Discover
                      </Button>
                    </motion.div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 1 }}
                    whileHover={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <h3 className="text-3xl font-bold text-white">{category.name}</h3>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 0.05, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="absolute -right-20 top-40 text-[120px] font-bold tracking-tighter"
          >
            COLLECTIONS
          </motion.div>
        </section>

        {/* New Arrivals */}
        <section ref={newArrivalsRef} className="py-24 md:py-32 bg-zinc-50 relative overflow-hidden">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex flex-col items-start space-y-4 mb-16"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "6rem" }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="h-1 bg-black"
              ></motion.div>
              <div className="flex justify-between w-full items-end">
                <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold tracking-tighter">
                  New Arrivals
                </motion.h2>
                <motion.div variants={fadeInUp} whileHover={{ x: 5 }}>
                  <Link href="#" className="text-sm uppercase tracking-widest flex items-center group">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                { name: "Oversized Cotton Tee", price: "$49" },
                { name: "Relaxed Fit Jeans", price: "$89" },
                { name: "Wool Blend Coat", price: "$199" },
                { name: "Leather Crossbody Bag", price: "$129" },
              ].map((product, i) => (
                <motion.div key={i} variants={fadeInUp} whileHover={{ y: -10 }} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden mb-4">
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }} className="h-full w-full">
                      <Image
                        src={`/placeholder.svg?height=600&width=450&text=Product ${i + 1}`}
                        alt={product.name}
                        className="object-cover"
                        fill
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-black/10"
                    ></motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button variant="secondary" size="icon" className="absolute top-3 right-3 rounded-full">
                        <Heart className="h-4 w-4" />
                        <span className="sr-only">Add to wishlist</span>
                      </Button>
                    </motion.div>
                    <motion.div
                      initial={{ y: "100%" }}
                      whileHover={{ y: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute bottom-0 left-0 right-0 bg-white p-3"
                    >
                      <Button className="w-full rounded-none">Add to Cart</Button>
                    </motion.div>
                  </div>
                  <motion.h3 variants={fadeInUp} className="font-medium">
                    {product.name}
                  </motion.h3>
                  <motion.p variants={fadeInUp} className="text-sm text-zinc-500">
                    {product.price}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 0.05, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="absolute -left-20 bottom-40 text-[120px] font-bold tracking-tighter"
          >
            NEW
          </motion.div>
        </section>

        {/* About Section */}
        <section ref={aboutRef} className="py-24 md:py-32 relative overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="relative"
              >
                <div className="aspect-square overflow-hidden">
                  <motion.div
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.2 }}
                    viewport={{ once: true }}
                    className="h-full w-full"
                  >
                    <Image
                      src="/placeholder.svg?height=800&width=800&text=Our Story"
                      alt="milwauky studio"
                      className="object-cover"
                      fill
                    />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20, x: 20 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-10 -left-10 bg-black text-white p-8 max-w-[300px]"
                >
                  <p className="text-sm">
                    "We believe in creating garments that stand the test of time, both in style and durability."
                  </p>
                  <p className="text-xs mt-4 font-light">— Founder</p>
                </motion.div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="space-y-6"
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "6rem" }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="h-1 bg-black"
                ></motion.div>
                <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold tracking-tighter">
                  Our Story
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-zinc-500 text-lg">
                  Founded in 2023, milwauky was born from a desire to create timeless, sustainable clothing that
                  transcends trends. Our pieces are designed with intention, using high-quality materials and ethical
                  manufacturing processes.
                </motion.p>
                <motion.p variants={fadeInUp} className="text-zinc-500">
                  We believe in creating garments that last, both in style and durability. Each piece is thoughtfully
                  designed to be versatile, comfortable, and effortlessly stylish.
                </motion.p>
                <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="rounded-none px-8 py-6 mt-4 group">
                    Learn More
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.div>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 0.05, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="absolute -right-20 bottom-40 text-[120px] font-bold tracking-tighter"
          >
            ABOUT
          </motion.div>
        </section>

        {/* Newsletter */}
        <section className="py-24 md:py-32 bg-black text-white relative overflow-hidden">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                Join Our Community
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-white/70 text-lg mb-8">
                Subscribe to our newsletter for exclusive offers, new arrivals, and styling inspiration.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  placeholder="Your email address"
                  className="bg-transparent border-b border-white/30 px-4 py-2 focus:outline-none focus:border-white flex-1"
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-white text-black hover:bg-white/90 rounded-none">Subscribe</Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Decorative elements */}
          <motion.div
            animate={{
              rotate: [0, 360],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 20,
              ease: "linear",
            }}
            className="absolute top-1/4 left-10 w-40 h-40 rounded-full border border-white/20"
          ></motion.div>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 5,
              ease: "easeInOut",
            }}
            className="absolute bottom-1/4 right-10 w-20 h-20 rounded-full border-2 border-white/20"
          ></motion.div>
        </section>

        {/* Instagram Feed */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex flex-col items-start space-y-4 mb-16"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "6rem" }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="h-1 bg-black"
              ></motion.div>
              <div className="flex justify-between w-full items-end">
                <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold tracking-tighter">
                  @milwauky
                </motion.h2>
                <motion.div variants={fadeInUp} whileHover={{ x: 5 }}>
                  <Link href="#" className="text-sm uppercase tracking-widest flex items-center group">
                    Follow Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="grid grid-cols-2 md:grid-cols-4 gap-2"
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.03 }}
                  className="relative aspect-square overflow-hidden group"
                >
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.7 }} className="h-full w-full">
                    <Image
                      src={`/placeholder.svg?height=500&width=500&text=Instagram ${i + 1}`}
                      alt={`Instagram post ${i + 1}`}
                      className="object-cover"
                      fill
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-black/30 flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Heart className="text-white h-8 w-8" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white">
        <div className="container px-4 md:px-6 py-12 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center mb-12"
          >
            <Link href="/" className="font-bold text-2xl tracking-widest uppercase mb-6">
              milwauky
            </Link>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="flex space-x-6"
            >
              {["Twitter", "Instagram", "Facebook", "TikTok"].map((social) => (
                <motion.div key={social} variants={fadeInUp} whileHover={{ y: -5 }}>
                  <Link href="#" className="text-sm hover:underline">
                    {social}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 border-t border-b"
          >
            {[
              {
                title: "Shop",
                links: ["New Arrivals", "Men", "Women", "Accessories", "Sale"],
              },
              {
                title: "Company",
                links: ["About Us", "Sustainability", "Careers", "Press", "Contact"],
              },
              {
                title: "Customer Service",
                links: ["Shipping & Returns", "FAQ", "Size Guide", "Privacy Policy", "Terms of Service"],
              },
              {
                title: "Contact",
                isAddress: true,
              },
            ].map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                viewport={{ once: true }}
              >
                <h3 className="font-medium mb-4 uppercase tracking-wider text-sm">{section.title}</h3>
                {section.isAddress ? (
                  <address className="not-italic text-sm text-zinc-500">
                    <p>123 Fashion Street</p>
                    <p>New York, NY 10001</p>
                    <p className="mt-2">contact@milwauky.com</p>
                    <p>+1 (555) 123-4567</p>
                  </address>
                ) : (
                  <ul className="space-y-2 text-sm">
                    {section.links.map((item) => (
                      <motion.li key={item} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                        <Link href="#" className="text-zinc-500 hover:text-zinc-900">
                          {item}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="pt-8 flex flex-col md:flex-row justify-between items-center"
          >
            <p className="text-xs text-zinc-500">© {new Date().getFullYear()} milwauky. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              {["Visa", "Mastercard", "PayPal", "Apple Pay"].map((payment, i) => (
                <motion.div
                  key={payment}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * i }}
                  viewport={{ once: true }}
                >
                  <Image
                    src={`/placeholder.svg?height=30&width=50&text=${payment}`}
                    alt={payment}
                    width={50}
                    height={30}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}