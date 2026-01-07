"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sidebar } from "../../components/sidebar";
import { Header } from "../../components/header";
import { Loading } from "../../components/loading";
import { DashboardLayout } from "../../components/layouts";
import { getProfileData, updateProfile } from "../actions";
import { templateList } from "../../components/templates";
import type { Profile } from "@/lib/types";

export default function TemplatesPage() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState("minimal");
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState<string | null>(null);

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

    const freeTemplates = templateList.filter(t => !t.isPro);
    const proTemplates = templateList.filter(t => t.isPro);

    return (
        <DashboardLayout>
            <Sidebar active="templates" username={profile?.username} />
            <div className="lg:ml-56 min-h-screen">
                <Header title="templates" username={profile?.username} />
                <main className="p-6 lg:p-8 max-w-2xl">
                    <section className="mb-12">
                        <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white mb-6">choose a style</h2>
                        <div className="space-y-2">
                            {freeTemplates.map((template) => (
                                <button
                                    key={template.id}
                                    onClick={() => handleApplyTemplate(template.id)}
                                    disabled={applying === template.id}
                                    className={`w-full flex items-center justify-between py-4 px-4 border transition-colors text-left ${selectedTemplate === template.id
                                            ? "border-pink-500 bg-pink-50 dark:bg-pink-500/5"
                                            : "border-gray-200 dark:border-gray-800 hover:border-gray-300"
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <span
                                            className="w-4 h-4 rounded"
                                            style={{ backgroundColor: template.previewAccent }}
                                        />
                                        <div>
                                            <p className={`text-sm ${selectedTemplate === template.id ? "text-pink-500" : "text-[#1a1a1a] dark:text-white"}`}>
                                                {template.name}
                                            </p>
                                            <p className="text-xs text-gray-400">{template.description}</p>
                                        </div>
                                    </div>
                                    {selectedTemplate === template.id && (
                                        <span className="text-xs text-pink-500">active</span>
                                    )}
                                    {applying === template.id && (
                                        <span className="text-xs text-gray-400">applying...</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </section>

                    {proTemplates.length > 0 && (
                        <section className="mb-12">
                            <div className="flex items-center gap-2 mb-6">
                                <h2 className="text-sm font-medium text-[#1a1a1a] dark:text-white">pro templates</h2>
                                <span className="text-[10px] text-pink-500">upgrade to unlock</span>
                            </div>
                            <div className="space-y-2 opacity-50">
                                {proTemplates.map((template) => (
                                    <div
                                        key={template.id}
                                        className="w-full flex items-center justify-between py-4 px-4 border border-gray-200 dark:border-gray-800 cursor-not-allowed"
                                    >
                                        <div className="flex items-center gap-4">
                                            <span
                                                className="w-4 h-4 rounded"
                                                style={{ backgroundColor: template.previewAccent }}
                                            />
                                            <div>
                                                <p className="text-sm text-[#1a1a1a] dark:text-white">{template.name}</p>
                                                <p className="text-xs text-gray-400">{template.description}</p>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-400">🔒</span>
                                    </div>
                                ))}
                            </div>
                            <Link
                                href="/pricing"
                                className="inline-block mt-4 text-xs text-pink-500 hover:text-pink-400"
                            >
                                view pricing →
                            </Link>
                        </section>
                    )}
                </main>
            </div>
        </DashboardLayout>
    );
}
