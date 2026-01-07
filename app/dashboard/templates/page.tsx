"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sidebar } from "../../components/sidebar";
import { Header } from "../../components/header";
import { Loading } from "../../components/loading";
import { DashboardLayout } from "../../components/layouts";
import { getProfileData, getLinks, updateProfile } from "../actions";
import { templateList, getTemplate } from "../../components/templates";
import type { Profile, Link as LinkType } from "@/lib/types";

export default function TemplatesPage() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [links, setLinks] = useState<LinkType[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState("minimal");
    const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            const [profileData, linksData] = await Promise.all([getProfileData(), getLinks()]);
            setProfile(profileData);
            setLinks(linksData);
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
        setProfile(prev => prev ? { ...prev, template: templateId } : null);
        setApplying(null);
    };

    if (loading) return <Loading />;

    const freeTemplates = templateList.filter(t => !t.isPro);
    const proTemplates = templateList.filter(t => t.isPro);
    const displayTemplate = previewTemplate || selectedTemplate;
    const currentConfig = getTemplate(displayTemplate).config;

    const themes: Record<string, { primary: string; secondary: string; bg: string }> = {
        pink: { primary: "#ec4899", secondary: "#db2777", bg: "#fce7f3" },
        lavender: { primary: "#a78bfa", secondary: "#8b5cf6", bg: "#ede9fe" },
        mint: { primary: "#34d399", secondary: "#10b981", bg: "#d1fae5" },
        peach: { primary: "#fb923c", secondary: "#f97316", bg: "#ffedd5" },
        ocean: { primary: "#38bdf8", secondary: "#0ea5e9", bg: "#e0f2fe" },
        rose: { primary: "#f472b6", secondary: "#ec4899", bg: "#fdf2f8" },
        midnight: { primary: "#818cf8", secondary: "#6366f1", bg: "#1e1b4b" },
        sunset: { primary: "#fb7185", secondary: "#f43f5e", bg: "#fff1f2" },
        forest: { primary: "#22c55e", secondary: "#16a34a", bg: "#f0fdf4" },
    };

    const TemplateComponent = getTemplate(displayTemplate).Template;
    const theme = themes[profile?.theme || "pink"];

    const previewLinks = links.length > 0 ? links.filter(l => l.enabled !== false) : [
        { id: "1", title: "my portfolio", url: "#", enabled: true },
        { id: "2", title: "follow me on twitter", url: "#", enabled: true },
        { id: "3", title: "join my discord", url: "#", enabled: true },
    ];

    return (
        <DashboardLayout>
            <Sidebar active="templates" username={profile?.username} />
            <div className="lg:ml-56 min-h-screen">
                <Header title="templates" username={profile?.username} />
                <main className="p-6 lg:p-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-8">
                            <div
                                className="w-full h-[400px] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 relative"
                                onMouseLeave={() => setPreviewTemplate(null)}
                            >
                                <TemplateComponent
                                    profile={profile}
                                    links={previewLinks}
                                    theme={theme}
                                    showSocials={profile?.showSocials ?? true}
                                />
                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                    <div className="px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-lg">
                                        <span className="text-white text-sm font-medium">{currentConfig.name}</span>
                                        <span className="text-white/60 text-xs ml-2">{currentConfig.description}</span>
                                    </div>
                                    {previewTemplate && previewTemplate !== selectedTemplate && (
                                        <button
                                            onClick={() => handleApplyTemplate(previewTemplate)}
                                            disabled={applying === previewTemplate}
                                            className="px-4 py-2 bg-pink-500 text-white text-sm font-medium rounded-lg hover:bg-pink-600 transition-colors"
                                        >
                                            {applying === previewTemplate ? "applying..." : "use this template"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-4">free templates</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                                {freeTemplates.map((template) => {
                                    const isSelected = selectedTemplate === template.id;
                                    const isApplying = applying === template.id;

                                    return (
                                        <button
                                            key={template.id}
                                            onClick={() => handleApplyTemplate(template.id)}
                                            onMouseEnter={() => setPreviewTemplate(template.id)}
                                            disabled={isApplying}
                                            className={`relative p-4 rounded-xl border-2 transition-all text-left ${isSelected
                                                ? "border-pink-500 bg-pink-50 dark:bg-pink-500/10"
                                                : "border-gray-200 dark:border-gray-800 hover:border-pink-300 dark:hover:border-pink-500/50 bg-white dark:bg-[#252525]"
                                                }`}
                                        >
                                            <div
                                                className="w-8 h-8 rounded-lg mb-2"
                                                style={{ backgroundColor: template.previewAccent }}
                                            />
                                            <p className={`text-sm font-medium ${isSelected ? "text-pink-500" : "text-[#1a1a1a] dark:text-white"}`}>
                                                {template.name}
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{template.description}</p>
                                            {isSelected && (
                                                <div className="absolute top-2 right-2 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {proTemplates.length > 0 && (
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white">pro templates</h2>
                                    <span className="px-2 py-0.5 text-[10px] font-bold bg-linear-to-r from-pink-500 to-purple-500 text-white rounded-full">PRO</span>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                                    {proTemplates.map((template) => (
                                        <div
                                            key={template.id}
                                            onMouseEnter={() => setPreviewTemplate(template.id)}
                                            className="relative p-4 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-[#252525] opacity-60 cursor-not-allowed"
                                        >
                                            <div
                                                className="w-8 h-8 rounded-lg mb-2"
                                                style={{ backgroundColor: template.previewAccent }}
                                            />
                                            <p className="text-sm font-medium text-[#1a1a1a] dark:text-white">{template.name}</p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{template.description}</p>
                                            <div className="absolute top-2 right-2 text-sm">🔒</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 p-5 rounded-xl bg-linear-to-r from-pink-50 to-purple-50 dark:from-pink-500/5 dark:to-purple-500/5 border border-pink-200 dark:border-pink-500/20">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-lg">
                                            ✨
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-medium text-[#1a1a1a] dark:text-white">unlock pro templates</h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                custom backgrounds, music, and premium designs
                                            </p>
                                        </div>
                                        <Link
                                            href="/pricing"
                                            className="px-4 py-2 bg-linear-to-r from-pink-500 to-purple-500 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                                        >
                                            upgrade
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </DashboardLayout>
    );
}
