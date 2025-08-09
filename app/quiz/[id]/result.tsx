import React from 'react';
import { View, ScrollView, Text, Alert, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

import { ResultHeader } from '@/components/Join/Result/ResultHeader';
import { ResultSummary } from '@/components/Join/Result/ResultSummary';
import { ResultQuestionCard } from '@/components/Join/Result/ResultQuestionCard';
import { Button } from '@/components/ui/Button';
import { ResultData } from '@/components/Join/types';

export default function ResultsScreen() {
    const { result, rank } = useLocalSearchParams();

    const userResult = Array.isArray(result) ? result[0] : result;
    const userRank = Array.isArray(rank) ? rank[0] : rank;

    let parsed: ResultData | null = null;
    try {
        if (typeof userResult === 'string') {
            parsed = JSON.parse(userResult);
        }
    } catch (err) {
        console.error('Failed to parse result data:', err);
    }

    if (!parsed) {
        return (
            <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
                <Text className="text-gray-800 dark:text-gray-100 text-lg">
                    Unable to load results data
                </Text>
            </View>
        );
    }

    const generateProfessionalHTML = (): string => {
        const questionsHTML = parsed!.questions
            .map((q, idx) => `
                <div class="question-container">
                    <div class="question-header">
                        <h3>Question ${idx + 1}</h3>
                        <div class="question-meta">
                            <span class="points">${q.points} pts</span>
                            <span class="time">${q.timeTaken || 0}s</span>
                        </div>
                    </div>
                    <p class="question-text">${q.question}</p>
                    <div class="options-container">
                        ${q.options
                    .map((opt, i) => {
                        const isCorrect = i === q.correctIndex;
                        const isSelected = i === q.selectedIndex;
                        let statusIcon = '';
                        let statusClass = '';

                        if (isCorrect) {
                            statusIcon = '✓';
                            statusClass = 'correct';
                        } else if (isSelected) {
                            statusIcon = '✗';
                            statusClass = 'incorrect';
                        }

                        return `
                                    <div class="option ${statusClass}">
                                        <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                                        <span class="option-text">${opt}</span>
                                        ${statusIcon ? `<span class="status-icon">${statusIcon}</span>` : ''}
                                    </div>
                                `;
                    })
                    .join('')}
                    </div>
                </div>
            `)
            .join('');

        const correctAnswers = parsed!.questions.filter(q => q.selectedIndex === q.correctIndex).length;
        const totalQuestions = parsed!.questions.length;
        const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>QuizIt Results Report - ${parsed!.summary.name}</title>
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
                        line-height: 1.5;
                        color: #1e293b;
                        background: #f8fafc;
                        padding: 40px 20px;
                        -webkit-font-smoothing: antialiased;
                    }
                    
                    .container {
                        max-width: 680px;
                        margin: 0 auto;
                        padding: 40px;
                        background: white;
                    }
                    
                    .header {
                        border-bottom: 1px solid #e5e5e5;
                        padding-bottom: 32px;
                        margin-bottom: 48px;
                    }
                    
                    .title {
                        font-size: 24px;
                        font-weight: 600;
                        color: #1e293b;
                        margin-bottom: 8px;
                        letter-spacing: -0.02em;
                    }
                    
                    .subtitle {
                        font-size: 14px;
                        color: #64748b;
                        font-weight: 400;
                    }
                    
                    .summary {
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 32px;
                        margin-bottom: 48px;
                    }
                    
                    .stat {
                        text-align: left;
                    }
                    
                    .stat-label {
                        font-size: 11px;
                        color: #64748b;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        margin-bottom: 4px;
                        font-weight: 500;
                    }
                    
                    .stat-value {
                        font-size: 18px;
                        color: #1e293b;
                        font-weight: 600;
                        letter-spacing: -0.01em;
                    }
                    
                    .divider {
                        height: 1px;
                        background: #e5e5e5;
                        margin: 48px 0;
                    }
                    
                    .content {
                        padding: 0;
                    }
                    
                    .section-title {
                        font-size: 16px;
                        color: #1e293b;
                        margin-bottom: 32px;
                        font-weight: 600;
                        letter-spacing: -0.01em;
                    }
                    
                    .question-container {
                        background: #ffffff;
                        border: 1px solid #e9ecef;
                        border-radius: 8px;
                        margin-bottom: 25px;
                        overflow: hidden;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                    }
                    
                    .question-header {
                        background: #f8f9fa;
                        padding: 15px 20px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: 1px solid #e9ecef;
                    }
                    
                    .question-header h3 {
                        color: #495057;
                        font-size: 1.1rem;
                        font-weight: 600;
                    }
                    
                    .question-meta {
                        display: flex;
                        gap: 15px;
                    }
                    
                    .points, .time {
                        background: #3b82f6;
                        color: white;
                        padding: 4px 12px;
                        border-radius: 20px;
                        font-size: 0.8rem;
                        font-weight: 500;
                    }
                    
                    .question-text {
                        padding: 20px;
                        font-size: 1rem;
                        line-height: 1.6;
                        background: white;
                        border-bottom: 1px solid #e9ecef;
                    }
                    
                    .options-container {
                        padding: 0;
                    }
                    
                    .option {
                        display: flex;
                        align-items: center;
                        padding: 12px 20px;
                        border-bottom: 1px solid #f1f3f4;
                        transition: background-color 0.2s;
                    }
                    
                    .option:last-child {
                        border-bottom: none;
                    }
                    
                    .option-letter {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        width: 24px;
                        height: 24px;
                        background: #e9ecef;
                        color: #6c757d;
                        border-radius: 50%;
                        font-weight: 600;
                        font-size: 0.8rem;
                        margin-right: 12px;
                        flex-shrink: 0;
                    }
                    
                    .option-text {
                        flex: 1;
                        font-size: 0.95rem;
                    }
                    
                    .status-icon {
                        font-weight: bold;
                        font-size: 1.1rem;
                        margin-left: 8px;
                    }
                    
                    .option.correct {
                        background-color: #dcfce7;
                        border-left: 4px solid #22c55e;
                    }
                    
                    .option.correct .option-letter {
                        background: #22c55e;
                        color: white;
                    }
                    
                    .option.correct .status-icon {
                        color: #15803d;
                    }
                    
                    .option.incorrect {
                        background-color: #fee2e2;
                        border-left: 4px solid #ef4444;
                    }
                    
                    .option.incorrect .option-letter {
                        background: #ef4444;
                        color: white;
                    }
                    
                    .option.incorrect .status-icon {
                        color: #dc2626;
                    }
                    
                    .footer {
                        margin-top: 64px;
                        padding-top: 24px;
                        border-top: 1px solid #e5e5e5;
                        text-align: center;
                        font-size: 11px;
                        color: #aaa;
                    }
                    
                    @media print {
                        body {
                            padding: 0;
                            background: white;
                        }
                        .container {
                            box-shadow: none;
                            border-radius: 0;
                        }
                        .question-container {
                            break-inside: avoid;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 class="title">QuizIt Results Report</h1>
                        <p class="subtitle">${new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}</p>
                    </div>
                    
                    <div class="summary">
                        <div class="stat">
                            <div class="stat-label">Name</div>
                            <div class="stat-value">${parsed!.summary.name}</div>
                        </div>
                        <div class="stat">
                            <div class="stat-label">Rank</div>
                            <div class="stat-value">#${parsed!.summary.rank}</div>
                        </div>
                        <div class="stat">
                            <div class="stat-label">Score</div>
                            <div class="stat-value">${parsed!.summary.totalPoints}</div>
                        </div>
                        <div class="stat">
                            <div class="stat-label">Accuracy</div>
                            <div class="stat-value">${accuracy}%</div>
                        </div>
                    </div>
                    
                    <div class="divider"></div>
                    
                    <div class="content">
                        <h2 class="section-title">Question Breakdown</h2>
                        ${questionsHTML}
                    </div>
                    
                    <div class="footer">
                        QuizIt Results Report
                    </div>
                </div>
            </body>
            </html>
        `;
    };

    const handleDownload = async () => {
        try {
            const html = generateProfessionalHTML();

            if (Platform.OS === 'web') {
                // For web development, open in new window for preview/download
                const newWindow = window.open('', '_blank');
                if (newWindow) {
                    newWindow.document.write(html);
                    newWindow.document.close();
                    // Trigger print dialog automatically
                    setTimeout(() => {
                        newWindow.print();
                    }, 500);
                } else {
                    Alert.alert(
                        'Popup Blocked',
                        'Please allow popups for this site to download the PDF.',
                        [{ text: 'OK' }]
                    );
                }
            } else {
                // For mobile devices (iOS/Android)
                const fileName = `quiz_results_${parsed!.summary.name.replace(/\s+/g, '_')}_${Date.now()}.pdf`;

                const { uri } = await Print.printToFileAsync({
                    html,
                    width: 612,
                    height: 792,
                    base64: false,
                    margins: {
                        left: 20,
                        top: 20,
                        right: 20,
                        bottom: 20,
                    },
                });

                if (await Sharing.isAvailableAsync()) {
                    await Sharing.shareAsync(uri, {
                        UTI: 'com.adobe.pdf',
                        mimeType: 'application/pdf',
                        dialogTitle: 'Save Quiz Results PDF',
                    });
                } else {
                    const documentDir = FileSystem.documentDirectory;
                    if (documentDir) {
                        const newPath = `${documentDir}${fileName}`;
                        await FileSystem.copyAsync({
                            from: uri,
                            to: newPath,
                        });
                        Alert.alert(
                            'PDF Generated',
                            `Quiz results saved to: Documents/${fileName}`,
                            [{ text: 'OK' }]
                        );
                    }
                }
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
            Alert.alert(
                'Error',
                'Failed to generate PDF. Please try again.',
                [{ text: 'OK' }]
            );
        }
    };

    return (
        <View className="flex-1 bg-violet-950 pt-safe-offset-4">
            <ResultHeader />
            <ScrollView
                contentContainerStyle={{ paddingBottom: 80 }}
                showsVerticalScrollIndicator={false}
            >
                <ResultSummary {...{ ...parsed.summary, rank: Number(userRank) }} />

                <View className="mx-6 bg-white dark:bg-gray-900 rounded-t-3xl rounded-b-none pt-6 pb-2">
                    {parsed.questions.map((q, index) => (
                        <ResultQuestionCard
                            key={q.id}
                            id={q.id}
                            index={index + 1}
                            question={q.question}
                            correctIndex={q.correctIndex}
                            selectedIndex={q.selectedIndex}
                            options={q.options}
                            points={q.points}
                            timeTaken={q.timeTaken ?? 0}
                        />
                    ))}
                </View>

                <View className="mx-6 my-6">
                    <Button
                        title="Download PDF Report"
                        variant="solid"
                        color="primary"
                        size="lg"
                        fullWidth
                        onPress={handleDownload}
                    />
                </View>
            </ScrollView>
        </View>
    );
}