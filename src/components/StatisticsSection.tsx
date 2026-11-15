import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Eye, CalendarDays, CalendarRange, Calendar, RefreshCw, TrendingUp } from 'lucide-react';
import { VisitorStatsSummary, StatsPeriodPoint } from '../types';
import { api } from '../services/api';

type PeriodGranularity = 'daily' | 'weekly' | 'monthly';

export const StatisticsSection: React.FC = () => {
  const [stats, setStats] = useState<VisitorStatsSummary | null>(null);
  const [granularity, setGranularity] = useState<PeriodGranularity>('daily');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadStats = async () => {
    setIsLoading(true);
    try {
      const data = await api.getVisitorStats();
      if (data) {
        setStats(data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const activeSeries: StatsPeriodPoint[] =
    !stats
      ? []
      : granularity === 'daily'
        ? stats.dailySeries
        : granularity === 'weekly'
          ? stats.weeklySeries
          : stats.monthlySeries;

  const maxViewsInSeries = Math.max(1, ...activeSeries.map((pt) => pt.views));
  const maxPageViews = Math.max(1, ...(stats?.pageBreakdown.map((p) => p.views) || [1]));

  const periodTitle =
    granularity === 'daily'
      ? 'Évolution journalière des vues (14 derniers jours)'
      : granularity === 'weekly'
        ? 'Évolution hebdomadaire des vues (8 dernières semaines)'
        : 'Évolution mensuelle des vues (6 derniers mois)';

  return (
    <section id="statistiques" className="py-14 lg:py-20 bg-[#F7FBF8] min-h-screen border-b border-[#DCE9E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#168447] flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Fréquentation & Audience en Temps Réel</span>
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#173528] mt-2">
              Statistiques de visites du site
            </h2>
            <p className="text-sm sm:text-base text-[#64756B] mt-2 leading-relaxed">
              Consultez le volume réel de vues journalières, hebdomadaires et mensuelles des usagers qui visitent Univers Habakuk Digital Pro.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            {stats?.lastUpdated && (
              <span className="text-[11px] text-[#64756B]">
                Mis à jour : {new Date(stats.lastUpdated).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
            <button
              type="button"
              onClick={loadStats}
              disabled={isLoading}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-[#DCE9E0] bg-white hover:bg-[#E8F5EC] text-[#173528] flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#168447] ${isLoading ? 'animate-spin' : ''}`} />
              <span>Actualiser</span>
            </button>
          </div>
        </div>

        {/* 4 Summary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Journalières */}
          <div className="p-5 bg-white rounded-2xl border border-[#DCE9E0] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64756B] uppercase tracking-wide">
                Vues Journalières
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#E8F5EC] text-[#168447] flex items-center justify-center">
                <CalendarDays className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <p className="font-heading font-extrabold text-3xl text-[#173528] tabular-nums">
                {stats ? stats.todayViews : '—'}
              </p>
              <p className="text-xs text-[#168447] font-medium mt-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <span>{stats ? `${stats.todayUnique} usager${stats.todayUnique > 1 ? 's' : ''} unique${stats.todayUnique > 1 ? 's' : ''} aujourd’hui` : 'Chargement...'}</span>
              </p>
            </div>
          </div>

          {/* Hebdomadaires */}
          <div className="p-5 bg-white rounded-2xl border border-[#C9F0D5] bg-gradient-to-br from-white to-[#F7FBF8] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#0B5D32] uppercase tracking-wide">
                Vues Hebdomadaires
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#168447] text-white flex items-center justify-center">
                <CalendarRange className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <p className="font-heading font-extrabold text-3xl text-[#0B5D32] tabular-nums">
                {stats ? stats.weekViews : '—'}
              </p>
              <p className="text-xs text-[#64756B] font-medium mt-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#168447]" />
                <span>{stats ? `${stats.weekUnique} usager${stats.weekUnique > 1 ? 's' : ''} sur 7 jours` : 'Chargement...'}</span>
              </p>
            </div>
          </div>

          {/* Mensuelles */}
          <div className="p-5 bg-white rounded-2xl border border-[#DCE9E0] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64756B] uppercase tracking-wide">
                Vues Mensuelles
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#E8F5EC] text-[#168447] flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <p className="font-heading font-extrabold text-3xl text-[#173528] tabular-nums">
                {stats ? stats.monthViews : '—'}
              </p>
              <p className="text-xs text-[#64756B] font-medium mt-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#168447]" />
                <span>{stats ? `${stats.monthUnique} usager${stats.monthUnique > 1 ? 's' : ''} ce mois-ci` : 'Chargement...'}</span>
              </p>
            </div>
          </div>

          {/* Total cumulé */}
          <div className="p-5 bg-[#173528] text-white rounded-2xl border border-[#0B5D32] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#C9F0D5] uppercase tracking-wide">
                Total Cumulé
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#168447] text-white flex items-center justify-center">
                <Eye className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <p className="font-heading font-extrabold text-3xl text-white tabular-nums">
                {stats ? stats.totalViews : '—'}
              </p>
              <p className="text-xs text-[#C9F0D5] font-medium mt-1 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{stats ? `${stats.totalUnique} visiteur${stats.totalUnique > 1 ? 's' : ''} distinct${stats.totalUnique > 1 ? 's' : ''}` : 'Chargement...'}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Period Switcher + Chart Card */}
        <div className="bg-white rounded-2xl border border-[#DCE9E0] p-5 sm:p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DCE9E0] pb-4">
            <div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#173528]">
                {periodTitle}
              </h3>
              <p className="text-xs text-[#64756B] mt-0.5">
                Basculer entre la vue journalière, hebdomadaire et mensuelle pour analyser la tendance des visites.
              </p>
            </div>

            <div className="inline-flex p-1 rounded-xl bg-[#F7FBF8] border border-[#DCE9E0] self-start sm:self-auto">
              {([
                { id: 'daily', label: 'Journalière' },
                { id: 'weekly', label: 'Hebdomadaire' },
                { id: 'monthly', label: 'Mensuelle' }
              ] as const).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setGranularity(tab.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    granularity === tab.id
                      ? 'bg-[#168447] text-white shadow-2xs'
                      : 'text-[#64756B] hover:text-[#173528]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[560px] h-56 flex items-end gap-2 sm:gap-3 pt-6 px-2 border-b border-[#DCE9E0]">
              {activeSeries.map((pt) => {
                const heightPct = pt.views === 0 ? 4 : Math.max(10, Math.round((pt.views / maxViewsInSeries) * 100));
                return (
                  <div key={pt.key} className="flex-1 flex flex-col items-center justify-end h-full group">
                    <span className="text-[11px] font-mono-code font-bold text-[#0B5D32] mb-1.5 tabular-nums">
                      {pt.views}
                    </span>
                    <div className="w-full max-w-[44px] flex-1 flex items-end justify-center">
                      <div
                        style={{ height: `${heightPct}%` }}
                        title={`${pt.label}${pt.sublabel ? ` (${pt.sublabel})` : ''} : ${pt.views} vue(s), ${pt.uniqueVisitors} usager(s)`}
                        className={`w-full rounded-t-lg transition-all duration-300 ${
                          pt.views > 0
                            ? 'bg-gradient-to-t from-[#0B5D32] to-[#168447] group-hover:from-[#168447] group-hover:to-emerald-500 shadow-xs'
                            : 'bg-[#E8F5EC]'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="min-w-[560px] flex gap-2 sm:gap-3 px-2 pt-2">
              {activeSeries.map((pt) => (
                <div key={pt.key} className="flex-1 text-center">
                  <p className="text-[10px] sm:text-[11px] font-semibold text-[#173528] truncate">
                    {pt.label}
                  </p>
                  {pt.sublabel && (
                    <p className="text-[9px] text-[#64756B] truncate">
                      {pt.sublabel}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Table for the Selected Period */}
          <div className="overflow-x-auto rounded-xl border border-[#DCE9E0]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7FBF8] border-b border-[#DCE9E0] text-[#64756B] uppercase font-semibold">
                <tr>
                  <th className="py-2.5 px-4">Période</th>
                  <th className="py-2.5 px-4">Détail</th>
                  <th className="py-2.5 px-4 text-right">Nombre de vues</th>
                  <th className="py-2.5 px-4 text-right">Usagers uniques</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCE9E0]">
                {[...activeSeries].reverse().map((pt) => (
                  <tr key={pt.key} className="hover:bg-[#F7FBF8] transition-colors">
                    <td className="py-2.5 px-4 font-semibold text-[#173528]">
                      {pt.label}
                    </td>
                    <td className="py-2.5 px-4 text-[#64756B]">
                      {pt.sublabel || pt.key}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono-code font-bold text-[#168447] tabular-nums">
                      {pt.views}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono-code text-[#173528] tabular-nums">
                      {pt.uniqueVisitors}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Page Breakdown Card */}
        <div className="bg-white rounded-2xl border border-[#DCE9E0] p-5 sm:p-6 shadow-xs space-y-4">
          <div>
            <h3 className="font-heading font-bold text-base text-[#173528]">
              Consultations par rubrique du site
            </h3>
            <p className="text-xs text-[#64756B] mt-0.5">
              Répartition des pages consultées par les visiteurs depuis la mise en ligne.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(stats?.pageBreakdown || []).map((item) => {
              const barPct = item.views === 0 ? 0 : Math.max(4, Math.round((item.views / maxPageViews) * 100));
              return (
                <div key={item.page} className="p-3.5 rounded-xl bg-[#F7FBF8] border border-[#DCE9E0] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#173528]">{item.label}</span>
                    <span className="font-mono-code font-bold text-[#0B5D32] tabular-nums">
                      {item.views} vue{item.views > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#E8F5EC] overflow-hidden">
                    <div
                      style={{ width: `${barPct}%` }}
                      className="h-full rounded-full bg-[#168447] transition-all duration-300"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
