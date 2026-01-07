"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../../components/sidebar";
import { Loading } from "../../components/loading";
import { DashboardLayout } from "../../components/layouts";
import { getProfileData, updateProfile } from "../actions";
import { templateList, getTemplate } from "../../components/templates";
import type { Profile } from "@/lib/types";

export default function TemplatesPage() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState("minimal");
    const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState<string | null>(null);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        async function load() {
            const profileData = await getProfileData();
            setProfile(profileData);
            if (profileData?.template) {
                setSelectedTemplate(profileData.template);
            }
            setLoading(false);
        }
        load();
    }, []);

    const handleApplyTemplate = async (templateId: string) => {
        setApplying(templateId);
        await updateProfile({ template: templateId });
        setSelectedTemplate(templateId);
        setApplying(null);
    };

    if (loading) return <Loading />;

    const filteredTemplates = filter === "all"
        ? templateList
        : templateList.filter(t => t.tags?.includes(filter));

    return (
        <DashboardLayout>
            <Sidebar active="templates" username={profile?.username} />
            <div className="lg:ml-56 min-h-screen">
                <div className="sticky top-0 z-20 bg-[#fdf5f3]/95 dark:bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
                    <div className="px-8 py-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-[#1a1a1a] dark:text-white flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-xl bg-linear-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-lg">✨</span>
                                    templates
                                </h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    choose a style that matches your vibe
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="search templates..."
                                        className="w-64 pl-10 pr-4 py-2.5 bg-white dark:bg-[#252525] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
                                    />
                                    <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {["all", "minimal", "aesthetic", "dark", "cute", "retro"].map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => setFilter(tag)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === tag
                                        ? "bg-pink-500 text-white shadow-lg shadow-pink-500/25"
                                        : "bg-white dark:bg-[#252525] text-gray-600 dark:text-gray-400 hover:bg-pink-50 dark:hover:bg-pink-500/10 hover:text-pink-500 border border-gray-200 dark:border-gray-700"
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <main className="p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                        {filteredTemplates.map((template) => {
                            const templateModule = getTemplate(template.id);
                            const TemplateComponent = templateModule.Template;
                            const isSelected = selectedTemplate === template.id;
                            const isApplying = applying === template.id;
                            const isPreviewing = previewTemplate === template.id;

                            return (
                                <div
                                    key={template.id}
                                    className={`group relative rounded-2xl overflow-hidden bg-white dark:bg-[#252525] border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${isSelected
                                        ? "border-pink-500 ring-4 ring-pink-500/20 shadow-xl shadow-pink-500/10"
                                        : "border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-500/50"
                                        }`}
                                    onMouseEnter={() => setPreviewTemplate(template.id)}
                                    onMouseLeave={() => setPreviewTemplate(null)}
                                >
                                    {isSelected && (
                                        <div className="absolute top-3 left-3 z-20 px-2.5 py-1 bg-pink-500 text-white text-[10px] font-bold rounded-full shadow-lg">
                                            CURRENT
                                        </div>
                                    )}

                                    <button
                                        className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-pink-500 hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>

                                    <div className="aspect-9/14 relative overflow-hidden">
                                        <div className="absolute inset-0 scale-[0.5] origin-top-left w-[200%] h-[200%]">
                                            <TemplateComponent
                                                profile={profile}
                                                links={[
                                                    { id: "1", title: "my website", url: "#", enabled: true },
                                                    { id: "2", title: "youtube", url: "#", enabled: true },
                                                    { id: "3", title: "discord", url: "#", enabled: true },
                                                ]}
                                                theme={{ primary: "#ec4899", secondary: "#db2777", bg: "#fce7f3" }}
                                                showSocials={true}
                                            />
                                        </div>

                                        <div className={`absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-4 transition-opacity duration-300 ${isPreviewing ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                                            <button
                                                onClick={() => handleApplyTemplate(template.id)}
                                                disabled={isSelected || isApplying}
                                                className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${isSelected
                                                    ? "bg-white/20 text-white/60 cursor-not-allowed"
                                                    : "bg-white text-[#1a1a1a] hover:bg-pink-500 hover:text-white shadow-lg"
                                                    }`}
                                            >
                                                {isApplying ? (
                                                    <span className="flex items-center justify-center gap-2">
                                                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                        </svg>
                                                        applying...
                                                    </span>
                                                ) : isSelected ? "current template" : "use template"}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="font-semibold text-[#1a1a1a] dark:text-white">{template.name}</h3>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{template.description}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 mb-3">
                                            {template.tags?.slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[10px] rounded-md"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                                            <div className="flex items-center gap-3 text-xs text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                    </svg>
                                                    {(template.id.charCodeAt(0) * 73 + 500) % 5000 + 500}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                    </svg>
                                                    {(template.id.charCodeAt(0) * 17 + 100) % 1000 + 100}
                                                </span>
                                            </div>
                                            <span className="text-[10px] text-pink-500 font-medium">{template.vibe}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-12 text-center">
                        <div className="inline-flex flex-col items-center p-8 rounded-2xl bg-linear-to-br from-pink-50 to-purple-50 dark:from-pink-500/5 dark:to-purple-500/5 border border-pink-200 dark:border-pink-500/20">
                            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-2xl mb-4 shadow-lg shadow-pink-500/25">
                                🎨
                            </div>
                            <h3 className="text-lg font-bold text-[#1a1a1a] dark:text-white mb-2">more templates coming soon</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-sm">
                                tumblr, cottagecore, dark academia & more aesthetic vibes coming soon
                            </p>
                            <button className="px-6 py-2.5 bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] text-sm font-medium rounded-xl hover:opacity-90 transition-opacity">
                                request a template ♡
                            </button>
                        </div>
                    </div>
                </main>
            </div>

            {previewTemplate && (
                <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
                    <div className="bg-white dark:bg-[#252525] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="p-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">live preview</span>
                            <button
                                onClick={() => setPreviewTemplate(null)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="w-[200px] h-[380px] overflow-hidden">
                            {(() => {
                                const templateModule = getTemplate(previewTemplate);
                                const TemplateComponent = templateModule.Template;
                                return (
                                    <TemplateComponent
                                        profile={profile}
                                        links={[
                                            { id: "1", title: "my website", url: "#", enabled: true },
                                            { id: "2", title: "youtube", url: "#", enabled: true },
                                            { id: "3", title: "discord", url: "#", enabled: true },
                                        ]}
                                        theme={{ primary: "#ec4899", secondary: "#db2777", bg: "#fce7f3" }}
                                        showSocials={true}
                                    />
                                );
                            })()}
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
