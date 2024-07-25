"use client"
import Image from 'next/image';
import DasshCard1 from '../components/DasshCard1';

import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
];

const data = [
    { value: 5, label: 'A' },
    { value: 10, label: 'B' },
    { value: 15, label: 'C' },
    { value: 20, label: 'D' },
];

const size = {
    width: 400,
    height: 200,
};

const settings = {
    width: 200,
    height: 200,
    value: 60,
};

/**
 * TODO: 
 * Ventes totales : Montant des ventes pour la période sélectionnée.
Nouvelle opportunités : Nombre d'opportunités commerciales nouvelles.
Employés présents : Nombre d'employés actuellement présents.
Dépenses totales : Montant des dépenses pour la période sélectionnée.

Graphique des ventes : Diagramme linéaire ou à barres montrant les ventes sur une période sélectionnée.
Graphique des dépenses : Diagramme circulaire ou à barres montrant la répartition des dépenses par catégorie.
Taux de présence : Graphique linéaire montrant le taux de présence des employés.

Dernières transactions : Table des transactions récentes avec les colonnes (Date, Description, Montant).
Nouveaux clients : Liste des clients récemment ajoutés avec les colonnes (Nom, Entreprise, Date d'ajout).
Demandes de congé en attente : Table des demandes de congé avec les colonnes (Employé, Type de congé, Dates, Statut).

Alertes récentes : Liste des notifications et alertes récentes (Ex. : factures impayées, congés en attente d'approbation).

 */
export default function Dashboard() {
    return (
        <main className="flex flex-col space-y-10">
            <h1 className="text-2xl font-bold ">Vue d'ensemble </h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 xl-grid-cols-4 '>

                <DasshCard1 image={'/image/comptable.png'} title={'Nombre d\'employé '} value={10}  />
                <DasshCard1 image={'/image/opportunite.png'} title={'Nombre de client'} value={10}  />
                <DasshCard1 image={'/image/opportunite.png'} title={'Nouvelle opportunités'} value={10}  />
                <DasshCard1 image={'/image/commerce-electronique.png'} title={'Ventes totales'} value={10}  />
                <DasshCard1 image={'/image/depenser-de-largent.png'} title={'Dépenses totales'} value={10}  />
                <DasshCard1 image={'/image/depenser-de-largent.png'} title={'Postulants pour un poste'} value={10}  />


            </div>

            <div className="flex md:space-x-20 space-y-20  md:flex-row flex-col">
                <div className='grid grid-cols-1 gap-4 md:grid-cols-3 xl-grid-cols-4 '>



                    {/*  
                  <div className='flex  gap-2 items-center mt-2'>
                        {/** pie 
                        <PieChart
                            series={[
                                {
                                    arcLabel: (item) => `${item.label} (${item.value})`,
                                    arcLabelMinAngle: 45,
                                    data,
                                },
                            ]}
                            sx={{
                                [`& .${pieArcLabelClasses.root}`]: {
                                    fill: 'white',
                                    fontWeight: 'bold',
                                },
                            }}
                            {...size}
                        />
                        {/** gouge 
                        <Gauge
                            {...settings}
                            cornerRadius="50%"
                            sx={(theme) => ({
                                [`& .${gaugeClasses.valueText}`]: {
                                    fontSize: 40,
                                },
                                [`& .${gaugeClasses.valueArc}`]: {
                                    fill: '#52b202',
                                },
                                [`& .${gaugeClasses.referenceArc}`]: {
                                    fill: theme.palette.text.disabled,
                                },
                            })}
                        />

                    </div> */}

                </div>
                {/** notificaiotns 
                <div className='w-[350px] hidden md:hidden h-[450px] bg-gray-200 shadow-xl p-5 '>
                    <h1 className="text-2xl font-bold ">Notifications</h1>
                </div>*/}
            </div>



            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <BarChart
                        xAxis={[
                            {
                                id: 'barCategories',
                                data: ['bar A', 'bar B', 'bar C'],
                                scaleType: 'band',
                            },
                        ]}
                        series={[
                            {
                                data: [2, 5, 3],
                            },
                        ]}
                        width={500}
                        height={300}
                    />
                </div>

                <div>
                    <LineChart
                        width={500}
                        height={300}
                        series={[{ data: uData, label: 'uv', area: true, showMark: false }]}
                        xAxis={[{ scaleType: 'point', data: xLabels }]}
                        sx={{
                            [`& .${lineElementClasses.root}`]: {
                                display: 'none',
                            },
                        }}
                    />
                </div>
            </div>

        </main>
    );

}