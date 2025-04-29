import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useNavigate, useLocation } from "react-router-dom";
import './ViewCESResponses.css';

Chart.register(...registerables);

function ViewCESResponsesPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const CESResponsesArr = state.responsesArr;
    const survey = state.survey;
    const data = [];
    const choiceCount = { A: 0, B: 0, C: 0, D: 0 }; // Track all choices, not just top ones

    function CESconsolidate(respArr) {
        if (respArr.length === 0) return;

        const dict_consolidate = {};
        const resp_temp_prep = respArr[0]['Responses'];

        for (const [key] of Object.entries(resp_temp_prep)) {
            dict_consolidate[key] = { A: 0, B: 0, C: 0, D: 0 };
        }

        respArr.forEach((ele) => {
            const resp_ele = ele["Responses"];
            for (const [key, value] of Object.entries(resp_ele)) {
                if (dict_consolidate[key]) {
                    dict_consolidate[key][value]++;
                    // Count all choices for the aggregate
                    choiceCount[value]++;
                }
            }
        });

        for (const [key_outer, value_outer] of Object.entries(dict_consolidate)) {
            const temp_label = [];
            const temp_response_count = [];
            let temp_title = "";

            const index = survey['Question_List'].findIndex(
                (question) => question.tag.toString() === key_outer
            );

            if (index !== -1) {
                const question = survey['Question_List'][index];
                temp_title = question.question_prompt;

                ['A', 'B', 'C', 'D'].forEach((option) => {
                    temp_label.push(question[`option_${option}`]);
                    temp_response_count.push(value_outer[option] || 0);
                });

                data.push({
                    labels: temp_label,
                    datasets: [{
                        label: temp_title,
                        data: temp_response_count,
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(255, 99, 132, 0.7)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 99, 132, 1)'
                        ],
                        borderWidth: 1,
                        borderRadius: 4,
                        barPercentage: 0.8,
                    }]
                });
            }
        }
    }

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.7)',
                titleFont: { size: 14, weight: 'bold' },
                bodyFont: { size: 12 },
                padding: 10,
                cornerRadius: 4
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(0,0,0,0.05)' },
                ticks: { stepSize: 1, precision: 0 }
            },
            x: { grid: { display: false } }
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutQuad'
        }
    };

    const aggregateOptions = {
        ...chartOptions,
        plugins: {
            ...chartOptions.plugins,
            title: {
                display: true,
                text: 'Aggregate Count of All Choices Across Questions',
                font: { size: 16, weight: 'bold' }
            }
        }
    };

    if (CESResponsesArr.length === 0) {
        return (
            <div className="no-responses-container">
                <div className="no-responses-card">
                    <h2>No Responses Available</h2>
                    <p>There are no responses collected for this survey yet.</p>
                    <button className="back-button" onClick={() => navigate(-1)}>
                        ← Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    CESconsolidate(CESResponsesArr);

    // Prepare data for aggregate bar chart
    const aggregateData = {
        labels: ['Poor (A)', 'Fair (B)', 'Good (C)', 'Excellent (D)'],
        datasets: [{
            label: 'Total Choices',
            data: [
                choiceCount['A'],
                choiceCount['B'],
                choiceCount['C'],
                choiceCount['D']
            ],
            backgroundColor: [
                'rgba(54, 162, 235, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(255, 99, 132, 0.7)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1,
            borderRadius: 4,
            barPercentage: 0.8,
        }]
    };

    return (
        <div className="ces-responses-container">
            <div className="ces-header">
                <h1>CES Responses Analysis</h1>
                <p className="survey-info">
                    {survey.SubjectID} • {survey.Sem_ID} • {CESResponsesArr.length} Responses
                </p>
                <button className="back-button" onClick={() => navigate(-1)}>
                    ← Back to Results
                </button>
            </div>

            {/* Aggregate Bar Chart for All Choices */}
            <div className="aggregate-bar-chart">
                <div className="chart-card">
                    <h3 className="chart-title">Overall Choice Distribution</h3>
                    <div className="chart-container">
                        <Bar data={aggregateData} options={aggregateOptions} />
                    </div>
                    <div className="chart-summary">
                        <div className="summary-item">
                            <span className="summary-label">Total Responses:</span>
                            <span className="summary-value">
                                {Object.values(choiceCount).reduce((a, b) => a + b, 0)}
                            </span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Most Selected:</span>
                            <span className="summary-value">
                                {['Poor (A)', 'Fair (B)', 'Good (C)', 'Excellent (D)'][
                                    Object.values(choiceCount).indexOf(
                                        Math.max(...Object.values(choiceCount))
                                    )
                                ]}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Individual Bar Charts */}
            <div className="charts-grid">
                {data.map((data_set, index) => (
                    <div key={index} className="chart-card">
                        <h3 className="chart-title">{data_set.datasets[0].label}</h3>
                        <div className="chart-container">
                            <Bar data={data_set} options={chartOptions} />
                        </div>
                        <div className="chart-summary">
                            <div className="summary-item">
                                <span className="summary-label">Total:</span>
                                <span className="summary-value">
                                    {data_set.datasets[0].data.reduce((a, b) => a + b, 0)}
                                </span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">Top Choice:</span>
                                <span className="summary-value">
                                    {data_set.labels[
                                        data_set.datasets[0].data.indexOf(
                                            Math.max(...data_set.datasets[0].data)
                                        )
                                    ]}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewCESResponsesPage;
