import React, { useState, useEffect, useRef } from 'react';
import {
    Menu, X, ChevronRight, Palette, Printer,
    ExternalLink, MessageCircle, ArrowUpRight,
    MonitorSmartphone, Hexagon
} from 'lucide-react';

// --- Animation Component ---
const RevealOnScroll = ({ children, delay = 0, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const App = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Handle scroll effect for glassmorphic navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-black text-slate-300 font-sans selection:bg-orange-500/30 selection:text-orange-200 relative overflow-hidden">

            <style>
                {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(6deg); }
            50% { transform: translateY(-20px) rotate(4deg); }
          }
          @keyframes float-reverse {
            0%, 100% { transform: translateY(0px) rotate(-12deg) translateX(3rem) translateY(3rem); }
            50% { transform: translateY(-25px) rotate(-10deg) translateX(3rem) translateY(3rem); }
          }
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-float-reverse { animation: float-reverse 7s ease-in-out infinite; }
          .perspective-1000 { perspective: 1000px; }
        `}
            </style>

            {/* --- Ambient Background Glows --- */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/20 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="fixed bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-orange-900/20 rounded-full blur-[150px] pointer-events-none z-0" />
            <div className="fixed top-[40%] left-[60%] w-[20%] h-[30%] bg-amber-600/10 rounded-full blur-[100px] pointer-events-none z-0" />

            {/* --- Navigation --- */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled
                ? 'bg-black/40 backdrop-blur-xl border-white/10 py-4'
                : 'bg-transparent border-transparent py-6'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center">
                    <a href="#" className="flex items-center gap-2 group z-50">
                        <Hexagon className="w-8 h-8 text-orange-500 group-hover:rotate-90 transition-transform duration-500" />
                        <span className="text-xl font-bold tracking-tight text-white">
                            Asol <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Creations</span>
                        </span>
                    </a>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <a href="#services" className="hover:text-orange-400 transition-colors">Services</a>
                        <a href="#work" className="hover:text-orange-400 transition-colors">Work</a>
                        <a href="#contact" className="hidden md:inline-flex px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-orange-500/10 hover:border-orange-500/50 hover:text-orange-400 transition-all duration-300 backdrop-blur-md">
                            Let's Talk
                        </a>
                    </div>

                    <button
                        className="md:hidden text-white z-50 p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                <div className={`fixed inset-0 bg-black/95 backdrop-blur-2xl z-40 transition-transform duration-300 flex flex-col items-center justify-center gap-8 ${mobileMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'
                    } md:hidden`}>
                    <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold hover:text-orange-400 transition-colors">Services</a>
                    <a href="#work" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold hover:text-orange-400 transition-colors">Work</a>
                    <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-700 text-white font-semibold">
                        Let's Talk
                    </a>
                </div>
            </nav>

            <main className="relative z-10">

                {/* --- Hero Section --- */}
                <section className="min-h-screen flex items-center pt-24 pb-12 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
                        <div className="space-y-8 relative">
                            <RevealOnScroll delay={100}>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium backdrop-blur-md">
                                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                                    Creative Studio & Print Lab
                                </div>
                            </RevealOnScroll>

                            <RevealOnScroll delay={200}>
                                <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                                    Forging <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-700">Digital Identity</span> <br />
                                    & Physical Form.
                                </h1>
                            </RevealOnScroll>

                            <RevealOnScroll delay={300}>
                                <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed">
                                    Asol Creations bridges the gap between Web3 aesthetics and premium tangible assets. We design brands for the future and print materials for the present.
                                </p>
                            </RevealOnScroll>

                            <RevealOnScroll delay={400}>
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <a href="#work" className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.4)] transition-all duration-300 group">
                                        View Our Work
                                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                    <a href="#services" className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold transition-all duration-300 backdrop-blur-md">
                                        Explore Services
                                    </a>
                                </div>
                            </RevealOnScroll>
                        </div>

                        <div className="relative hidden lg:block h-[600px] w-full perspective-1000">
                            <RevealOnScroll delay={500} className="absolute inset-0 flex items-center justify-center">
                                <div className="animate-float relative w-80 h-96 bg-gradient-to-br from-white/[0.08] to-transparent border border-white/[0.1] rounded-3xl backdrop-blur-xl shadow-2xl z-20 flex flex-col items-center justify-center p-8 gap-6 group hover:[animation-play-state:paused]">
                                    <Palette className="w-16 h-16 text-orange-400 group-hover:scale-110 transition-transform duration-500" />
                                    <div className="h-2 w-24 bg-orange-500/50 rounded-full" />
                                    <div className="h-2 w-16 bg-white/20 rounded-full" />
                                </div>
                                <div className="animate-float-reverse absolute w-80 h-96 bg-gradient-to-bl from-orange-500/[0.15] to-transparent border border-orange-500/[0.2] rounded-3xl backdrop-blur-xl shadow-2xl -z-10 flex flex-col items-center justify-center p-8 gap-6 hover:[animation-play-state:paused]">
                                    <Printer className="w-16 h-16 text-slate-400" />
                                    <div className="h-2 w-20 bg-slate-500/50 rounded-full" />
                                    <div className="h-2 w-32 bg-white/10 rounded-full" />
                                </div>
                            </RevealOnScroll>
                        </div>
                    </div>
                </section>

                {/* --- Services Section --- */}
                <section id="services" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 border-t border-white/5">
                    <div className="max-w-7xl mx-auto">
                        <RevealOnScroll className="mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Expertise</span></h2>
                            <p className="text-slate-400 max-w-2xl text-lg">Seamlessly blending future-ready digital design with high-fidelity physical printing.</p>
                        </RevealOnScroll>

                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: <Palette className="w-8 h-8 text-orange-400" />,
                                    title: "Brand Architecture",
                                    desc: "Strategic visual identities designed for modern ecosystems. Logos, typography, and brand systems."
                                },
                                {
                                    icon: <Printer className="w-8 h-8 text-orange-400" />,
                                    title: "Premium Printing",
                                    desc: "High-end tangible assets. From foil-stamped business cards to bespoke packaging and large formats."
                                },
                                {
                                    icon: <MonitorSmartphone className="w-8 h-8 text-orange-400" />,
                                    title: "Web3 & Digital Assets",
                                    desc: "User-centric UI/UX design, NFT creative assets, and immersive digital graphics with a dark aesthetic."
                                }
                            ].map((service, idx) => (
                                <RevealOnScroll key={idx} delay={idx * 150}>
                                    <div className="group h-full p-6 md:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-orange-500/30 hover:bg-white/[0.04] transition-all duration-500 backdrop-blur-md relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all duration-500 -mr-10 -mt-10" />
                                        <div className="relative z-10">
                                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                                {service.icon}
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                                            <p className="text-slate-400 leading-relaxed">{service.desc}</p>
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- Work/Portfolio Section --- */}
                <section id="work" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 border-t border-white/5 relative">
                    <div className="max-w-7xl mx-auto">
                        <RevealOnScroll className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Works</span></h2>
                                <p className="text-slate-400 max-w-2xl text-lg">A showcase of projects across digital branding and physical media.</p>
                            </div>
                            <a href="#" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-medium group">
                                View All Projects <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                        </RevealOnScroll>

                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                {
                                    title: "Nexus DeFi Protocol",
                                    category: "Brand Identity & UI",
                                    img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1000",
                                    tag: "Web3"
                                },
                                {
                                    title: "Aura Premium Skincare",
                                    category: "Packaging & Print",
                                    img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=1000",
                                    tag: "Print"
                                },
                                {
                                    title: "Vertex Cybernetics",
                                    category: "Logo Design",
                                    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
                                    tag: "Branding"
                                },
                                {
                                    title: "Neon Nights Event",
                                    category: "Large Format Print",
                                    img: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=1000",
                                    tag: "Print"
                                }
                            ].map((project, idx) => (
                                <RevealOnScroll key={idx} delay={idx * 150}>
                                    <div className="group cursor-pointer">
                                        <div className="relative overflow-hidden rounded-3xl aspect-[4/3] mb-6 border border-white/[0.05]">
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                            <img
                                                src={project.img}
                                                alt={project.title}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                            />
                                            <div className="absolute top-6 left-6 z-20">
                                                <span className="px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-semibold text-white tracking-wider uppercase">
                                                    {project.tag}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-start px-2">
                                            <div>
                                                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">{project.title}</h3>
                                                <p className="text-slate-400">{project.category}</p>
                                            </div>
                                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-orange-500/10 group-hover:border-orange-500/50 transition-all duration-300">
                                                <ExternalLink className="w-5 h-5 text-slate-300 group-hover:text-orange-400" />
                                            </div>
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- Call to Action / Contact --- */}
                <section id="contact" className="py-16 md:py-24 px-4 sm:px-6 md:px-12">
                    <RevealOnScroll className="max-w-5xl mx-auto">
                        <div className="relative rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-16 overflow-hidden border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl shadow-2xl">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/20 rounded-full blur-[100px] -z-10" />
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-800/20 rounded-full blur-[100px] -z-10" />

                            <div className="relative z-10 text-center space-y-8">
                                <Hexagon className="w-16 h-16 text-orange-500 mx-auto" />
                                <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-tight">
                                    Ready to elevate your <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">brand presence?</span>
                                </h2>
                                <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                                    Whether you need a cutting-edge digital identity or premium physical prints, Asol Creations is ready to bring your vision to reality.
                                </p>

                                <div className="pt-8">
                                    <a href="https://wa.me/2348161217535?text=Hi%2C%20I%20want%20to%20start%20a%20project%20with%20you." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-black font-bold text-lg hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 group">
                                        <MessageCircle className="w-6 h-6" />
                                        Start a Project
                                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </section>

            </main>

            {/* --- Footer --- */}
            <footer className="border-t border-white/5 bg-black/50 backdrop-blur-lg py-12 px-4 sm:px-6 md:px-12 relative z-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Hexagon className="w-6 h-6 text-orange-500" />
                        <span className="text-lg font-bold tracking-tight text-white">Asol Creations</span>
                    </div>

                    <div className="flex gap-8 text-sm text-slate-400">
                        <a href="#" className="hover:text-orange-400 transition-colors">Twitter</a>
                        <a href="#" className="hover:text-orange-400 transition-colors">Instagram</a>
                        <a href="#" className="hover:text-orange-400 transition-colors">Behance</a>
                    </div>

                    <div className="text-sm text-slate-500">
                        &copy; {new Date().getFullYear()} Asol Creations.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
