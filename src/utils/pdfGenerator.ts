import { ApplicationItem } from '../types';
import { SITE_CONFIG } from '../data/catalog';

/**
 * Generates an official HTML document configured for high-fidelity A4 PDF printing
 */
export function generateApplicationPdfHtml(app: ApplicationItem): string {
  const dateStr = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Catalogue Officiel - ${app.id} ${app.name} - ${SITE_CONFIG.name}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 15mm 15mm 15mm 15mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #173528;
      background: #ffffff;
      line-height: 1.5;
      font-size: 13px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #168447;
      padding-bottom: 14px;
      margin-bottom: 20px;
    }
    .brand-title {
      font-size: 22px;
      font-weight: 800;
      color: #0B5D32;
      letter-spacing: -0.5px;
    }
    .brand-tagline {
      font-size: 11px;
      color: #64756B;
      margin-top: 3px;
    }
    .brand-contact {
      text-align: right;
      font-size: 11px;
      color: #64756B;
      line-height: 1.4;
    }
    .badge {
      display: inline-block;
      background: #E8F5EC;
      color: #0B5D32;
      border: 1px solid #C9F0D5;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .app-title {
      font-size: 26px;
      font-weight: 800;
      color: #173528;
      margin-bottom: 6px;
    }
    .meta-line {
      font-size: 12px;
      color: #64756B;
      margin-bottom: 16px;
    }
    .card {
      background: #F7FBF8;
      border: 1px solid #DCE9E0;
      border-radius: 8px;
      padding: 14px 18px;
      margin-bottom: 18px;
    }
    .card-title {
      font-size: 13px;
      font-weight: 700;
      color: #0B5D32;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }
    .description {
      font-size: 13px;
      color: #173528;
      line-height: 1.6;
    }
    .features-list {
      list-style: none;
    }
    .features-list li {
      position: relative;
      padding-left: 18px;
      margin-bottom: 6px;
      font-size: 12.5px;
      color: #173528;
    }
    .features-list li::before {
      content: "✔";
      position: absolute;
      left: 0;
      color: #168447;
      font-weight: bold;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-bottom: 18px;
    }
    .stamp-box {
      border: 2px dashed #168447;
      background: #E8F5EC;
      border-radius: 8px;
      padding: 12px;
      text-align: center;
      margin-top: 20px;
    }
    .stamp-title {
      font-weight: 800;
      font-size: 12px;
      color: #0B5D32;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .footer {
      margin-top: 25px;
      border-top: 1px solid #DCE9E0;
      padding-top: 10px;
      font-size: 10px;
      color: #64756B;
      display: flex;
      justify-content: space-between;
    }
    .image-container {
      width: 100%;
      height: 180px;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 18px;
      border: 1px solid #DCE9E0;
      background: #E8F5EC;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .image-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .btn-print {
      display: block;
      margin: 20px auto;
      padding: 10px 24px;
      background: #168447;
      color: white;
      font-size: 14px;
      font-weight: bold;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
    @media print {
      .btn-print {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <button class="btn-print" onclick="window.print()">📥 Imprimer / Enregistrer en PDF (Ctrl + P)</button>

  <div class="header">
    <div>
      <div class="brand-title">${SITE_CONFIG.name}</div>
      <div class="brand-tagline">${SITE_CONFIG.tagline}</div>
      <div style="font-size: 11px; color: #168447; font-weight: 600; margin-top: 4px;">
        ${SITE_CONFIG.creator_credit} · ${SITE_CONFIG.market}
      </div>
    </div>
    <div class="brand-contact">
      <strong>Direction des Projets Numériques</strong><br>
      WhatsApp : ${SITE_CONFIG.contact.phone}<br>
      E-mail : ${SITE_CONFIG.contact.email}<br>
      Édition du : ${dateStr}
    </div>
  </div>

  <div>
    <span class="badge">FICHE CATALOGUE TECHNIQUE OFFICIELLE</span>
    <h1 class="app-title">${app.name}</h1>
    <div class="meta-line">
      Référence : <strong>${app.id}</strong> &nbsp;|&nbsp;
      Domaine : <strong>${app.category}</strong> &nbsp;|&nbsp;
      Statut : <strong>${app.status}</strong>
    </div>
  </div>

  ${app.image_url ? `
  <div class="image-container">
    <img src="${app.image_url}" alt="${app.name} - Image de référence Univers Habakuk" />
  </div>
  ` : ''}

  <div class="card">
    <div class="card-title">Présentation & Objectif du Projet</div>
    <p class="description">${app.description}</p>
  </div>

  <div class="card">
    <div class="card-title">Cahier des Charges & Spécifications Fonctionnelles</div>
    <ul class="features-list">
      ${app.features.map(f => `<li>${f}</li>`).join('')}
    </ul>
  </div>

  <div class="grid-2">
    <div class="card" style="margin-bottom: 0;">
      <div class="card-title">Livrables Inclus à la Commande</div>
      <ul class="features-list">
        <li>Déploiement clé en main ou code source sécurisé</li>
        <li>Paramétrage avec votre identité visuelle et données</li>
        <li>Formation pratique et documentation de prise en main</li>
        <li>Garantie et assistance technique locale en Côte d’Ivoire</li>
      </ul>
    </div>
    <div class="card" style="margin-bottom: 0;">
      <div class="card-title">Modalités de Commande & Tarification</div>
      <p style="font-size: 12px; color: #173528; line-height: 1.5;">
        Conformément à la politique de transparence d’<strong>Univers Habakuk Digital Pro</strong>, chaque projet fait l'objet d'un <strong>devis personnalisé gratuit</strong> adapté à vos plateformes (Android, iOS, Web ou Ordinateur).
      </p>
      <p style="font-size: 11px; color: #0B5D32; font-weight: bold; margin-top: 8px;">
        Contact direct commande : ${SITE_CONFIG.contact.phone}
      </p>
    </div>
  </div>

  <div class="stamp-box">
    <div class="stamp-title">DOCUMENT CERTIFIÉ CONFORME — UNIVERS HABAKUK DIGITAL PRO</div>
    <div style="font-size: 11px; color: #0B5D32; margin-top: 3px;">
      Conçu et garanti par <strong>Ahoret Jean Cyrille</strong> · Abidjan, Côte d’Ivoire
    </div>
  </div>

  <div class="footer">
    <span>© ${new Date().getFullYear()} Univers Habakuk Digital Pro - Tous droits réservés.</span>
    <span>Fiche générée automatiquement pour référence client & entreprise</span>
  </div>

  <script>
    // Auto-trigger print dialog when opened in dedicated window
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>`;
}

/**
 * Downloads or prints the PDF version for an application
 */
export function downloadApplicationPdf(app: ApplicationItem): void {
  const htmlContent = generateApplicationPdfHtml(app);
  
  // Try opening in print window for native PDF printing
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  } else {
    // Fallback: download HTML/PDF file
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Catalogue_Univers_Habakuk_${app.id}_${app.name.replace(/[^a-zA-Z0-9]/g, '_')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

/**
 * Generates the full 16-application catalogue PDF document
 */
export function generateFullCataloguePdfHtml(applications: ApplicationItem[]): string {
  const dateStr = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Catalogue Complet 2026 - ${SITE_CONFIG.name}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm;
    }
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #173528;
      background: #ffffff;
      line-height: 1.4;
      font-size: 12px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .cover {
      page-break-after: always;
      text-align: center;
      padding: 60px 20px;
    }
    .cover-title {
      font-size: 32px;
      font-weight: 800;
      color: #0B5D32;
      margin-bottom: 8px;
    }
    .cover-subtitle {
      font-size: 16px;
      color: #64756B;
      margin-bottom: 30px;
    }
    .cover-meta {
      font-size: 13px;
      color: #168447;
      font-weight: bold;
    }
    .app-page {
      page-break-inside: avoid;
      border: 1px solid #DCE9E0;
      border-radius: 8px;
      padding: 14px;
      margin-bottom: 16px;
      background: #F7FBF8;
    }
    .app-header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #DCE9E0;
      padding-bottom: 8px;
      margin-bottom: 8px;
    }
    .app-name {
      font-size: 16px;
      font-weight: 800;
      color: #0B5D32;
    }
    .btn-print {
      display: block;
      margin: 20px auto;
      padding: 10px 24px;
      background: #168447;
      color: white;
      font-size: 14px;
      font-weight: bold;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
    @media print {
      .btn-print { display: none !important; }
    }
  </style>
</head>
<body>
  <button class="btn-print" onclick="window.print()">📥 Imprimer / Télécharger le Catalogue Complet en PDF</button>

  <div class="cover">
    <div style="width: 60px; height: 60px; background: #168447; color: white; border-radius: 12px; margin: 0 auto 20px; font-size: 32px; font-weight: bold; line-height: 60px;">U</div>
    <h1 class="cover-title">${SITE_CONFIG.name}</h1>
    <p class="cover-subtitle">${SITE_CONFIG.tagline}</p>
    <div style="max-width: 500px; margin: 0 auto 30px; font-size: 13px; color: #173528;">
      Grand Catalogue Officiel des 16 Solutions & Projets Numériques (Éducation, Gestion, IA, Jeux et Cuisine).
    </div>
    <p class="cover-meta">Conçu par Ahoret Jean Cyrille · ${SITE_CONFIG.market}</p>
    <p style="font-size: 11px; color: #64756B; margin-top: 6px;">Contact : ${SITE_CONFIG.contact.phone} | ${SITE_CONFIG.contact.email}</p>
    <p style="font-size: 11px; color: #64756B; margin-top: 4px;">Édition officielle du ${dateStr}</p>
  </div>

  <div>
    <h2 style="font-size: 18px; color: #0B5D32; border-bottom: 2px solid #168447; padding-bottom: 6px; margin-bottom: 16px;">
      Index des 16 Applications Référencées
    </h2>
    ${applications.map((app, i) => `
      <div class="app-page">
        <div class="app-header">
          <div>
            <span style="font-size: 11px; font-weight: bold; color: #168447;">${app.id} · ${app.category}</span>
            <div class="app-name">${app.name}</div>
          </div>
          <div style="font-size: 11px; color: #64756B; text-align: right;">
            ${app.status}
          </div>
        </div>
        <p style="font-size: 12px; color: #173528; margin-bottom: 8px;">${app.description}</p>
        <div style="font-size: 11px; color: #0B5D32; font-weight: bold; margin-bottom: 4px;">Fonctionnalités clés :</div>
        <ul style="padding-left: 18px; font-size: 11px; color: #64756B;">
          ${app.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>
    `).join('')}
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>`;
}

export function downloadFullCataloguePdf(applications: ApplicationItem[]): void {
  const htmlContent = generateFullCataloguePdfHtml(applications);
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  } else {
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Catalogue_Complet_Univers_Habakuk_2026.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
