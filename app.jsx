import React, { useState } from 'react';
// Removido: import jsPDF from 'jspdf';
// Removido: import 'jspdf-autotable';
import { FileText, DollarSign, ShieldCheck, Briefcase, TrendingUp, Printer, Building, Users } from 'lucide-react';

// Estrutura de dados inicial para os formulários (similar ao PDF)
const initialFormData = {
  mesReferencia: "Novembro de 2024",
  geral: {
    dconAtos: 56,
    dfitAtos: 1749,
    ditcAtos: 420,
    dtimAtos: 376,
    defAtos: 46,
    historicoMesAnterior1Nome: "Outubro-24",
    historicoMesAnterior1Valor: 2465,
    historicoMesAnterior2Nome: "Setembro-24",
    historicoMesAnterior2Valor: 2047,
  },
  dcon: {
    numAgentes: 2,
    atos: [
      { nome: "Notificação", valor: 5, proporcao: "8,9%" },
      { nome: "Parecer Fiscal de Isenção", valor: 8, proporcao: "14,3%" },
      { nome: "Demais Pareceres Fiscais", valor: 20, proporcao: "35,7%" },
      { nome: "Diligência Fiscal", valor: 9, proporcao: "16,1%" },
      { nome: "Levantamento Fiscal", valor: 0, proporcao: "0,0%" },
      { nome: "Despacho Fundamentado", valor: 14, proporcao: "25,0%" },
      { nome: "Termo de Inicio de Fiscalização", valor: 0, proporcao: "0,0%" },
    ],
  },
  dfit: {
    numAgentes: 7,
    alvarasEmitidos: 597,
    atos: [
      { nome: "Instrução em Proc. Simplificado", valor: 401, proporcao: "22,9%" },
      { nome: "Termo de Diligência Fiscal", valor: 112, proporcao: "6,4%" },
      { nome: "Relatório e Rel. Circunstanciado", valor: 193, proporcao: "11,0%" },
      { nome: "Instrução em Processo Regular", valor: 196, proporcao: "11,2%" },
      { nome: "Notificação Fiscal de Lançamento", valor: 81, proporcao: "4,6%" },
      { nome: "Contestação Fiscal", valor: 1, proporcao: "0,1%" },
      { nome: "Notificação", valor: 431, proporcao: "24,6%" },
      { nome: "Auto de Infração", valor: 0, proporcao: "0,0%" },
      { nome: "Parecer Técnico", valor: 14, proporcao: "0,8%" },
      { nome: "Outros Atos", valor: 320, proporcao: "18,3%" },
    ],
  },
  ditc: {
    numAgentes: 11,
    issqnMesValor: 73046.68,
    issqnMesQtdeAtos: 29,
    atos: [
      { nome: "Notificação", valor: 11, proporcao: "2,6%" },
      { nome: "Alteração Cadastral", valor: 141, proporcao: "33,6%" },
      { nome: "Pareceres Fiscais", valor: 14, proporcao: "3.3%" },
      { nome: "Despacho Fundamentado", valor: 3, proporcao: "0,7%" },
      { nome: "Notificação de Lançamento", valor: 28, proporcao: "6,7%" },
      { nome: "Relatórios", valor: 26, proporcao: "6,2%" },
      { nome: "Levantamento Fiscal", valor: 15, proporcao: "3,6%" },
      { nome: "Auto de Infração", valor: 0, proporcao: "0,0%" },
      { nome: "Contestação", valor: 2, proporcao: "0,5%" },
      { nome: "Outros Atos", valor: 180, proporcao: "42,9%" },
    ],
  },
  dtim: {
    numAgentes: 3,
    itbiConstituidoValor: 2272532.40,
    damsItbiOficioValor: 118,
    damsItbiOficioPerc: "30%",
    damsItbiDeclaracaoValor: 274,
    damsItbiDeclaracaoPerc: "70%",
    atos: [
      { nome: "Notificação de Lançamento", valor: 84, proporcao: "22,3%" },
      { nome: "Termos Diversos", valor: 44, proporcao: "11,7%" },
      { nome: "Pareceres Fiscais", valor: 9, proporcao: "2,4%" },
      { nome: "Notificação/Intimação", valor: 10, proporcao: "2,7%" },
      { nome: "Contestação Fiscal", valor: 0, proporcao: "0,0%" },
      { nome: "Outros Atos", valor: 229, proporcao: "60,9%" },
    ],
  },
  arrecadacao: {
    totalAgentesFiscaisDEF: 23,
    produtoArrecadacaoTotal: 381867166.90,
    metaOrcamentariaSemfaz: 393822101.00,
    metaAtingidaPercentual: "96,96%",
    tributos: [
      { nome: "IPTU", proporcao: "8,8%", valorAcumulado: 33614666.01, metaPercentual: "98,32%" },
      { nome: "ITBI", proporcao: "7,0%", valorAcumulado: 26619573.94, metaPercentual: "103,27%" },
      { nome: "ISSQN", proporcao: "48,3%", valorAcumulado: 184585131.21, metaPercentual: "95,98%" },
      { nome: "ISSQN SIMPLES NACIONAL", proporcao: "9,1%", valorAcumulado: 34761803.03, metaPercentual: "105,64%" },
      { nome: "TRSD", proporcao: "7,0%", valorAcumulado: 26566343.64, metaPercentual: "118,18%" },
      { nome: "Taxa da Licença de Loc. de Atividades", proporcao: "0,3%", valorAcumulado: 1326251.15, metaPercentual: "97,01%" },
      { nome: "Taxa de Fiscalização de Func. Regular", proporcao: "2,8%", valorAcumulado: 10579793.05, metaPercentual: "56,26%" },
      { nome: "Taxa de Licença de Anúnc. Publicitários", proporcao: "0,6%", valorAcumulado: 2411577.51, metaPercentual: "79,37%" },
      { nome: "COSIP", proporcao: "16,1%", valorAcumulado: 61402027.36, metaPercentual: "97,55%" },
    ],
  }
};

const Card = ({ children, className = '' }) => <div className={`bg-white shadow-md rounded-lg p-4 md:p-6 mt-6 ${className}`}>{children}</div>;
const CardHeader = ({ children, className = '' }) => <div className={`mb-4 pb-2 border-b border-gray-200 ${className}`}>{children}</div>;
const CardTitle = ({ children, icon, className = '' }) => <h3 className={`text-lg md:text-xl font-semibold text-gray-700 flex items-center ${className}`}>{icon && <span className="mr-2">{icon}</span>}{children}</h3>;
const CardContent = ({ children, className = '' }) => <div className={`${className}`}>{children}</div>;
const Button = ({ children, onClick, className = '', variant = 'default' }) => {
    const baseStyle = 'font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2 text-sm md:text-base';
    const variantStyles = {
        default: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
        success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
    };
    return <button onClick={onClick} className={`${baseStyle} ${variantStyles[variant]} ${className}`}>{children}</button>;
};
const Input = ({ label, value, onChange, type = "text", name, className = "" }) => (
    <div className={`mb-3 ${className}`}>
        <label className="block text-xs md:text-sm font-medium text-gray-600 mb-1">{label}</label>
        <input type={type} name={name} value={value} onChange={onChange} className="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm" />
    </div>
);

// Função para gerar o PDF
const generatePdf = (data) => {
    try { // Bloco try...catch para capturar qualquer erro durante a geração do PDF
        if (!window.jspdf || !window.jspdf.jsPDF) {
            alert("A biblioteca jsPDF não está carregada. Por favor, recarregue a página ou verifique a conexão.");
            return;
        }
        const doc = new window.jspdf.jsPDF();
        let autoTableInvoker = null;

        // Verifica a forma mais comum de autoTable (método da instância)
        if (typeof doc.autoTable === 'function') {
            autoTableInvoker = (options) => doc.autoTable(options);
        } 
        // Verifica se autoTable está no namespace jspdf (comum com scripts globais)
        else if (window.jspdf && typeof window.jspdf.autoTable === 'function') {
            // Neste caso, jspdf-autotable pode esperar o 'doc' como primeiro argumento
            autoTableInvoker = (options) => window.jspdf.autoTable(doc, options);
            // alert("DEBUG: Usando window.jspdf.autoTable(doc, options)"); // Para depuração do usuário
        }
        // Verifica se autoTable é uma função global (menos comum, mas possível)
        else if (typeof window.autoTable === 'function') {
             // Este também pode esperar 'doc' como primeiro argumento
            autoTableInvoker = (options) => window.autoTable(doc, options);
            // alert("DEBUG: Usando window.autoTable(doc, options)"); // Para depuração do usuário
        }
        
        if (!autoTableInvoker) {
            alert("A biblioteca jsPDF-AutoTable não está carregada ou configurada corretamente. As tabelas não serão geradas no PDF.");
            return; 
        }

        const pageHeight = doc.internal.pageSize.height;
        let yPos = 20;

        const checkYPos = (increment) => {
            if (yPos + increment > pageHeight - 20) {
                doc.addPage();
                yPos = 20;
            }
        };
        
        const headStyles = { fillColor: [22, 160, 133], textColor: [255,255,255], fontStyle: 'bold' };
        const theme = 'striped';

        doc.setFontSize(18);
        doc.setTextColor(40, 55, 71);
        doc.text("Relatório de Atividades Mensais", doc.internal.pageSize.getWidth() / 2, yPos, { align: 'center' });
        yPos += 7;
        doc.setFontSize(14);
        doc.text(`Departamento de Fiscalização (DEF/SUREM) - ${data.mesReferencia}`, doc.internal.pageSize.getWidth() / 2, yPos, { align: 'center' });
        yPos += 15;

        doc.setFontSize(14);
        doc.setTextColor(22, 160, 133);
        doc.text("Total de Atos Produzidos", 14, yPos);
        yPos += 8;
        
        const totalAtosData = [
            ["Divisão de Consultas e Normas (DCON)", data.geral.dconAtos],
            ["Divisão de Fiscalização de Taxas (DFIT)", data.geral.dfitAtos],
            ["Divisão de ISSQN e Transf. Constitucionais (DITC)", data.geral.ditcAtos],
            ["Divisão de Tributos Imobiliários (DTIM)", data.geral.dtimAtos],
            ["Departamento de Fiscalização (DEF)", data.geral.defAtos],
            ["TOTAL DO DEPARTAMENTO", data.geral.dconAtos + data.geral.dfitAtos + data.geral.ditcAtos + data.geral.dtimAtos + data.geral.defAtos]
        ];
        autoTableInvoker({ // Usando o invoker determinado
            startY: yPos,
            head: [['SETOR DE FISCALIZAÇÃO', 'ATOS FISCAIS PRODUZIDOS']],
            body: totalAtosData,
            theme: theme,
            headStyles: headStyles,
            styles: { fontSize: 9, cellPadding: 1.5 },
            columnStyles: { 1: { halign: 'right' } }
        });
        yPos = doc.lastAutoTable.finalY + 10;
        checkYPos(20);

        autoTableInvoker({ // Usando o invoker determinado
            startY: yPos,
            head: [['Produtividade/Mês de Referência', 'Total de Atos']],
            body: [
                [data.geral.historicoMesAnterior1Nome, data.geral.historicoMesAnterior1Valor],
                [data.geral.historicoMesAnterior2Nome, data.geral.historicoMesAnterior2Valor],
            ],
            theme: theme,
            headStyles: headStyles,
            styles: { fontSize: 9, cellPadding: 1.5 },
            columnStyles: { 1: { halign: 'right' } }
        });
        yPos = doc.lastAutoTable.finalY + 15;
        checkYPos(40);

        const addDivisionSection = (title, divisionData, labelAgentes = "Agentes") => {
            checkYPos(40);
            doc.setFontSize(14);
            doc.setTextColor(22, 160, 133);
            doc.text(title, 14, yPos);
            yPos += 8;

            const atosBody = divisionData.atos.map(ato => [ato.nome, ato.proporcao, ato.valor]);
            autoTableInvoker({ // Usando o invoker determinado
                startY: yPos,
                head: [['DESCRIÇÃO DO ATO FISCAL', 'PROPORÇÃO', 'TOTAL']],
                body: atosBody,
                theme: theme,
                headStyles: headStyles,
                styles: { fontSize: 9, cellPadding: 1.5 },
                columnStyles: { 1: { halign: 'right' }, 2: { halign: 'right' } }
            });
            yPos = doc.lastAutoTable.finalY + 5;

            const totalAtosDivisao = divisionData.atos.reduce((sum, ato) => sum + Number(ato.valor || 0), 0);
            const mediaAtos = divisionData.numAgentes > 0 ? (totalAtosDivisao / divisionData.numAgentes).toFixed(2) : 'N/A';
            
            doc.setFontSize(9);
            doc.setTextColor(50,50,50);
            doc.text(`NÚMERO DE ${labelAgentes.toUpperCase()}: ${divisionData.numAgentes}`, 14, yPos);
            doc.text(`TOTAL DE ATOS: ${totalAtosDivisao}`, 80, yPos);
            doc.text(`MÉDIA DE ATOS POR AGENTE: ${mediaAtos}`, 130, yPos);
            yPos += 7;

            if (divisionData.alvarasEmitidos) {
                checkYPos(10);
                doc.text(`Alvarás Emitidos no Mês: ${divisionData.alvarasEmitidos}`, 14, yPos);
                yPos += 7;
            }
            if (divisionData.issqnMesValor) {
                checkYPos(10);
                doc.text(`ISSQN no mês: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(divisionData.issqnMesValor)} (${divisionData.issqnMesQtdeAtos} atos)`, 14, yPos);
                yPos += 7;
            }
            if (divisionData.itbiConstituidoValor) {
                checkYPos(20);
                doc.text(`ITBI Constituído: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(divisionData.itbiConstituidoValor)}`, 14, yPos);
                yPos += 5;
                doc.text(`DAM's de ITBI Emitidos: Ofício ${divisionData.damsItbiOficioValor} (${divisionData.damsItbiOficioPerc}), Declaração ${divisionData.damsItbiDeclaracaoValor} (${divisionData.damsItbiDeclaracaoPerc})`, 14, yPos);
                yPos += 7;
            }
            yPos += 5;
        };

        addDivisionSection("Divisão de Consultas e Normas (DCON)", data.dcon, "Auditores");
        addDivisionSection("Divisão de Fiscalização de Taxas (DFIT)", data.dfit, "Fiscais");
        addDivisionSection("Divisão de ISSQN e Transf. Constitucionais (DITC)", data.ditc, "Auditores");
        addDivisionSection("Divisão de Tributos Imobiliários (DTIM)", data.dtim, "Auditores");
        
        checkYPos(40);
        doc.setFontSize(14);
        doc.setTextColor(22, 160, 133);
        doc.text("Produto da Arrecadação de Tributos Fiscalizados pelo DEF", 14, yPos);
        yPos += 8;

        const arrecadacaoBody = data.arrecadacao.tributos.map(t => [
            t.nome, 
            t.proporcao, 
            new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(t.valorAcumulado), 
            t.metaPercentual
        ]);
        autoTableInvoker({ // Usando o invoker determinado
            startY: yPos,
            head: [['TRIBUTOS', 'PROPORÇÃO', 'VALOR ACUMULADO', '% META']],
            body: arrecadacaoBody,
            theme: theme,
            headStyles: headStyles,
            styles: { fontSize: 8, cellPadding: 1.5 },
            columnStyles: { 
                1: { halign: 'right' }, 
                2: { halign: 'right' },
                3: { halign: 'right' } 
            }
        });
        yPos = doc.lastAutoTable.finalY + 5;

        checkYPos(20);
        doc.setFontSize(9);
        doc.setTextColor(50,50,50);
        doc.text(`TOTAL DE AGENTES FISCAIS (DEF): ${data.arrecadacao.totalAgentesFiscaisDEF}`, 14, yPos);
        yPos += 5;
        doc.text(`PRODUTO DA ARRECADAÇÃO: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.arrecadacao.produtoArrecadacaoTotal)}`, 14, yPos);
        yPos += 5;
        doc.text(`Meta Orçamentária dos Tributos fiscalizados pela SEMFAZ: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.arrecadacao.metaOrcamentariaSemfaz)}`, 14, yPos);
        yPos += 5;
        doc.text(`% META ATINGIDO: ${data.arrecadacao.metaAtingidaPercentual}`, 14, yPos);

        doc.save(`Relatorio_Fiscalizacao_${data.mesReferencia.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
    
    } catch (error) {
        console.error("Erro detalhado ao gerar PDF:", error); // Loga o erro completo no console
        alert(`Ocorreu um erro ao gerar o PDF: ${error.message}\n\nPor favor, verifique o console do navegador para mais detalhes (geralmente Ctrl+Shift+J ou Cmd+Option+J).`);
    }
};

const App = () => {
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e, section, index, field) => {
        const { name, value, type } = e.target;
        // Para campos numéricos, converter para número, mas permitir string vazia se o usuário apagar
        const val = type === 'number' ? (value === '' ? '' : parseFloat(value)) : value;


        if (section) {
            if (index !== undefined && field) { // Atualiza item em uma lista dentro de uma seção (ex: formData.dcon.atos[0].valor)
                const updatedSectionData = { ...formData[section] };
                const updatedList = [...updatedSectionData[field]];
                // Garante que o objeto no índice exista antes de tentar atribuir
                if(updatedList[index]) {
                    updatedList[index] = { ...updatedList[index], [name]: val };
                } else {
                    // Caso raro, mas para segurança
                    updatedList[index] = { [name]: val };
                }
                updatedSectionData[field] = updatedList;
                setFormData(prev => ({ ...prev, [section]: updatedSectionData }));

            } else if (name && formData[section] && typeof formData[section] === 'object' && Object.prototype.hasOwnProperty.call(formData[section], name)) { 
                 // Atualiza uma propriedade direta de um objeto de seção (ex: formData.geral.dconAtos)
                 const updatedSectionData = { ...formData[section], [name]: val };
                 setFormData(prev => ({ ...prev, [section]: updatedSectionData }));
            } else { 
                // Atualiza uma propriedade de um objeto de seção que pode não estar no nível superior (ex: formData.dcon.numAgentes)
                // Esta lógica pode ser um pouco redundante com a anterior, mas cobre casos de estrutura.
                setFormData(prev => ({
                    ...prev,
                    [section]: {
                        ...prev[section],
                        [name]: val
                    }
                }));
            }
        } else { // Atualiza propriedade no nível raiz (ex: formData.mesReferencia)
            setFormData(prev => ({ ...prev, [name]: val }));
        }
    };
    
    // handleListItemChange é mais específico para listas, garantindo que o parseFloat seja aplicado corretamente.
    const handleListItemChange = (e, section, listName, index) => {
        const { name, value, type } = e.target;
         // Para campos numéricos, converter para número, mas permitir string vazia se o usuário apagar
        const val = type === 'number' ? (value === '' ? '' : parseFloat(value)) : value;
        
        const newList = [...formData[section][listName]];
        newList[index] = { ...newList[index], [name]: val };
        
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [listName]: newList
            }
        }));
    };

    const renderAtosForm = (sectionName, atosList, numAgentesData, labelAgentes = "Agentes") => (
        <>
            <Input label={`Número de ${labelAgentes}`} type="number" name="numAgentes" value={numAgentesData} onChange={(e) => handleChange(e, sectionName)} className="w-1/2 md:w-1/4" />
            {sectionName === 'dfit' && (
                 <Input label="Alvarás Emitidos no Mês" type="number" name="alvarasEmitidos" value={formData.dfit.alvarasEmitidos} onChange={(e) => handleChange(e, 'dfit')} className="w-1/2 md:w-1/4" />
            )}
            {sectionName === 'ditc' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                    <Input label="ISSQN Constituído no Mês (Valor)" type="number" name="issqnMesValor" value={formData.ditc.issqnMesValor} onChange={(e) => handleChange(e, 'ditc')} />
                    <Input label="ISSQN Constituído no Mês (Qtde Atos)" type="number" name="issqnMesQtdeAtos" value={formData.ditc.issqnMesQtdeAtos} onChange={(e) => handleChange(e, 'ditc')} />
                </div>
            )}
            {sectionName === 'dtim' && (
                 <>
                    <Input label="ITBI Constituído (Valor)" type="number" name="itbiConstituidoValor" value={formData.dtim.itbiConstituidoValor} onChange={(e) => handleChange(e, 'dtim')} />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 items-end">
                        <Input label="DAMs ITBI - Ofício (Valor)" type="number" name="damsItbiOficioValor" value={formData.dtim.damsItbiOficioValor} onChange={(e) => handleChange(e, 'dtim')} />
                        <Input label="Ofício (%)" type="text" name="damsItbiOficioPerc" value={formData.dtim.damsItbiOficioPerc} onChange={(e) => handleChange(e, 'dtim')} />
                        <Input label="DAMs ITBI - Declaração (Valor)" type="number" name="damsItbiDeclaracaoValor" value={formData.dtim.damsItbiDeclaracaoValor} onChange={(e) => handleChange(e, 'dtim')} />
                        <Input label="Declaração (%)" type="text" name="damsItbiDeclaracaoPerc" value={formData.dtim.damsItbiDeclaracaoPerc} onChange={(e) => handleChange(e, 'dtim')} />
                    </div>
                 </>
            )}
            <h4 className="text-md font-medium text-gray-600 mt-4 mb-2">Atos Fiscais:</h4>
            {atosList.map((ato, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-x-3 items-center mb-2 p-2 border rounded-md bg-gray-50">
                    <p className="text-sm text-gray-700 md:col-span-1 mb-1 md:mb-0">{ato.nome}</p>
                    <Input label="Proporção (%)" name="proporcao" type="text" value={ato.proporcao} onChange={(e) => handleListItemChange(e, sectionName, 'atos', index)} className="md:col-span-1" />
                    <Input label="Total (Valor)" type="number" name="valor" value={ato.valor} onChange={(e) => handleListItemChange(e, sectionName, 'atos', index)} className="md:col-span-1" />
                </div>
            ))}
        </>
    );

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-inter">
            <header className="mb-6 md:mb-10 text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-blue-700">Gerador de Relatório de Fiscalização</h1>
                <p className="text-sm md:text-md text-gray-600">Preencha os dados abaixo para gerar o relatório em PDF.</p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle icon={<FileText />} >Informações Gerais</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input label="Mês de Referência" name="mesReferencia" value={formData.mesReferencia} onChange={(e) => handleChange(e)} />
                    <h4 className="text-md font-medium text-gray-600 mt-4 mb-2">Total de Atos Produzidos por Divisão:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4">
                        <Input label="DCON" type="number" name="dconAtos" value={formData.geral.dconAtos} onChange={(e) => handleChange(e, 'geral')} />
                        <Input label="DFIT" type="number" name="dfitAtos" value={formData.geral.dfitAtos} onChange={(e) => handleChange(e, 'geral')} />
                        <Input label="DITC" type="number" name="ditcAtos" value={formData.geral.ditcAtos} onChange={(e) => handleChange(e, 'geral')} />
                        <Input label="DTIM" type="number" name="dtimAtos" value={formData.geral.dtimAtos} onChange={(e) => handleChange(e, 'geral')} />
                        <Input label="DEF" type="number" name="defAtos" value={formData.geral.defAtos} onChange={(e) => handleChange(e, 'geral')} />
                    </div>
                    <h4 className="text-md font-medium text-gray-600 mt-4 mb-2">Produtividade Meses Anteriores:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                        <Input label="Mês Anterior 1 (Nome)" name="historicoMesAnterior1Nome" value={formData.geral.historicoMesAnterior1Nome} onChange={(e) => handleChange(e, 'geral')} />
                        <Input label="Mês Anterior 1 (Valor)" type="number" name="historicoMesAnterior1Valor" value={formData.geral.historicoMesAnterior1Valor} onChange={(e) => handleChange(e, 'geral')} />
                        <Input label="Mês Anterior 2 (Nome)" name="historicoMesAnterior2Nome" value={formData.geral.historicoMesAnterior2Nome} onChange={(e) => handleChange(e, 'geral')} />
                        <Input label="Mês Anterior 2 (Valor)" type="number" name="historicoMesAnterior2Valor" value={formData.geral.historicoMesAnterior2Valor} onChange={(e) => handleChange(e, 'geral')} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle icon={<FileText />} >Divisão de Consultas e Normas (DCON)</CardTitle></CardHeader>
                <CardContent>{renderAtosForm('dcon', formData.dcon.atos, formData.dcon.numAgentes, "Auditores")}</CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle icon={<ShieldCheck />} >Divisão de Fiscalização de Taxas (DFIT)</CardTitle></CardHeader>
                <CardContent>{renderAtosForm('dfit', formData.dfit.atos, formData.dfit.numAgentes, "Fiscais")}</CardContent>
            </Card>
            
            <Card>
                <CardHeader><CardTitle icon={<DollarSign />} >Divisão de ISSQN e Transf. Constitucionais (DITC)</CardTitle></CardHeader>
                <CardContent>{renderAtosForm('ditc', formData.ditc.atos, formData.ditc.numAgentes, "Auditores")}</CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle icon={<Briefcase />} >Divisão de Tributos Imobiliários (DTIM)</CardTitle></CardHeader>
                <CardContent>{renderAtosForm('dtim', formData.dtim.atos, formData.dtim.numAgentes, "Auditores")}</CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle icon={<TrendingUp />} >Produto da Arrecadação de Tributos (DEF)</CardTitle></CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                        <Input label="Total Agentes Fiscais (DEF)" type="number" name="totalAgentesFiscaisDEF" value={formData.arrecadacao.totalAgentesFiscaisDEF} onChange={(e) => handleChange(e, 'arrecadacao')} />
                        <Input label="Produto da Arrecadação Total (R$)" type="number" name="produtoArrecadacaoTotal" value={formData.arrecadacao.produtoArrecadacaoTotal} onChange={(e) => handleChange(e, 'arrecadacao')} />
                        <Input label="Meta Orçamentária SEMFAZ (R$)" type="number" name="metaOrcamentariaSemfaz" value={formData.arrecadacao.metaOrcamentariaSemfaz} onChange={(e) => handleChange(e, 'arrecadacao')} />
                        <Input label="% Meta Atingida" name="metaAtingidaPercentual" value={formData.arrecadacao.metaAtingidaPercentual} onChange={(e) => handleChange(e, 'arrecadacao')} />
                    </div>
                    <h4 className="text-md font-medium text-gray-600 mt-4 mb-2">Tributos:</h4>
                    {formData.arrecadacao.tributos.map((tributo, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-x-3 items-center mb-2 p-2 border rounded-md bg-gray-50">
                            <p className="text-sm text-gray-700 md:col-span-1 mb-1 md:mb-0">{tributo.nome}</p>
                            <Input label="Proporção (%)" name="proporcao" type="text" value={tributo.proporcao} onChange={(e) => handleListItemChange(e, 'arrecadacao', 'tributos', index)} className="md:col-span-1" />
                            <Input label="Valor Acumulado (R$)" type="number" name="valorAcumulado" value={tributo.valorAcumulado} onChange={(e) => handleListItemChange(e, 'arrecadacao', 'tributos', index)} className="md:col-span-1" />
                            <Input label="% Meta" name="metaPercentual" type="text" value={tributo.metaPercentual} onChange={(e) => handleListItemChange(e, 'arrecadacao', 'tributos', index)} className="md:col-span-1" />
                        </div>
                    ))}
                </CardContent>
            </Card>

            <div className="mt-8 mb-4 text-center">
                <Button onClick={() => generatePdf(formData)} variant="success" className="w-full md:w-auto">
                    <Printer className="inline-block w-5 h-5 mr-2" />
                    Gerar Relatório PDF
                </Button>
            </div>

            <footer className="text-center text-xs text-gray-500 mt-10 py-4 border-t">
                Gerador de Relatório de Fiscalização &copy; {new Date().getFullYear()} - Prefeitura de Porto Velho / SEMFAZ
            </footer>
        </div>
    );
};

export default App;
