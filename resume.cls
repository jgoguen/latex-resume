% CV/Résumé based on LaTeX article class. This must be compiled with XeLaTeX.
%
% Copyright (c) 2011 Joel Goguen <jgoguen (at) jgoguen.ca>
%
% This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License. View
% a human-readable license summary at http://creativecommons.org/licenses/by-sa/3.0/. Note that
% attribution is only required in the source document; output documents (including PDF documents,
% DVI files or HTML pages) are not required, but would be appreciated where providing an attribution
% will not detract from the quality of the document.
%
% This layout heavily based upon the LaTeX CV found at http://sethholloway.com/blog/2011/06/24/my-latex-resume-template/
% and also influenced by:
%	- http://www.cv-templates.info/2009/03/professional-cv-latex/

\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{resume}

% This is an article at heart
\DeclareOption*{\PassOptionsToClass{\CurrentOption}{article}}
\ProcessOptions\relax \LoadClass{article}

% Set your name here. This will update the PDF information and the name
% on the CV.
\newcommand{\myname}{John}
\newcommand{\mysurname}{Public}
\newcommand{\myfullname}{\myname\ Q.\ \mysurname}
\newcommand{\myurl}{http://www.example.com}
\newcommand{\addresstop}{123 My Street}
\newcommand{\addressbottom}{Somewhereville, AB, A1B 2C3}
\newcommand{\myphone}{(555) 555-5555}

% Default useful/helpful packages
\usepackage{marvosym}
\usepackage{amssymb}
\usepackage{fontspec}
\usepackage[letterpaper,top=2.3cm,bottom=2.3cm,left=2.5cm,right=2.5cm]{geometry}
\usepackage{fancyhdr}
\usepackage{lastpage}
\usepackage{multicol}

% This MUST be the last \usepackage in the list and MUST be before settings
\usepackage{hyperref}
\hypersetup{
	baseurl={\myurl}
	pdflang={en-CA},
	pdfauthor={\myfullname},
	pdfcreator={XeLaTeX},
	pdftitle={\myfullname - Résumé},
	pdfsubject={\myfullname's Résumé},
	%pdfstartview={FitW},
	pdfdisplaydoctitle=true,
	colorlinks=true,
	urlcolor=black,
	citecolor=black,
	filecolor=black,
	linkcolor=black
}
\urlstyle{same}

% Email uses hyperref, so it must come later
\newcommand{\myemail}{\href{mailto:myself@example.com}{myself@example.com}}
\newcommand{\myworkemail}{\href{mailto:myself@mywork.com}{myself@mywork.com}}

% Use the Fontin font
\defaultfontfeatures{Mapping=tex-text}
\setmainfont[SmallCapsFont = Fontin SmallCaps]{Fontin}

\raggedright

% Set default page header and footer
\setlength{\headheight}{8pt}
\pagestyle{fancy}
\fancyhf{}
\cfoot{Page \thepage\ of \pageref{LastPage}}
\fancypagestyle{empty}{%
\fancyhead{}
\fancyfoot{}
}
\renewcommand{\headrulewidth}{0pt}

% Definitions and environment changes from http://sethholloway.com/blog/2011/06/24/my-latex-resume-template/
\newenvironment{changemargin}[2]{%
	\begin{list}{}{%
		\setlength{\topsep}{0pt}%
		\setlength{\leftmargin}{#1}%
		\setlength{\rightmargin}{#2}%
		\setlength{\listparindent}{\parindent}%
		\setlength{\itemindent}{\parindent}%
		\setlength{\parsep}{\parskip}%
	}%
	\item[]}{\end{list}
}

\newcommand{\lineover}{
	\begin{changemargin}{-0.05in}{-0.05in}
		\vspace*{-8pt}
		\hrulefill \\
		\vspace*{-2pt}
	\end{changemargin}
}

\newcommand{\header}[1]{
	\vspace*{5pt}
	\begin{changemargin}{-0.5in}{-0.5in}
		\bfseries{\scshape{#1}}\\
	\lineover
	\end{changemargin}
}

\newcommand{\subheader}[1]{
	\vspace*{5pt}
	\begin{changemargin}{0in}{0in}
		\scshape{#1}\\
	\lineover
	\end{changemargin}
}

\newcommand{\contact}[6]{
	\begin{changemargin}{-0.5in}{-0.5in}
		\begin{tabular*}{7.5in}{l@{\extracolsep{\fill}}r}
		\textbf{\large #1}  & #6\\
		#2 & #5 \\
		#3 & \url{#4} \\
		\end{tabular*}
	\end{changemargin}
}

\newenvironment{body} {
	\vspace*{-2pt}
	\begin{changemargin}{-0.25in}{-0.5in}
}
{\end{changemargin}}

\newcommand{\school}[4]{
	\textbf{#1} \hfill \emph{#2\\}
	#3, #4\\
}

\newcommand{\employer}[2]{
	\vspace*{5pt}
	\begin{changemargin}{0in}{0in}
		\scshape{#1} \hfill #2\\
	\lineover
	\end{changemargin}
}

\newcommand{\jobrole}[2]{
	\textbf{#1} \hfill #2 \\
}