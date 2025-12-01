import { JobStatus } from "./types";

export const RAW_OCR_DATA = `
Integrated Solutions Consultancy http://www.iscoglobal.com Over the past 60 years the Consultancy has built up a reputation as a Project Management practice b United Kingdom 14 management consulting
Jean Edwards Consulting http://www.jeanedwards.com We inspire, and are inspired by, change. Since 2005, Jean Edwards Consulting has been providing the United Kingdom 72 2007 financial services
Kumi Consulting htp://www.kumi.consulting At Kumi we connect global raw material supply chains with responsible business practices in develop United Kingdom 20 2015 management consulting
POINT CONSULTANT http://www.point-maps.com Point specialises in maps, navigation and locationPoint's indoor map solution enables interactive digi United Kingdom 6 2009 information technology & services
NETQ MANAGEMENT CONSULTANCY SERVICES http://www.trustconsultingservices.com We bring an experience unmatched anywhere else, with knowledgeable and thoughtful consultants pl United Kingdom 37 2015 management consulting
L.E.K. Consulting htp://www.lek.com L.E.K. Consulting is a global management consulting firm that uses deep industry expertise and rigoro United Kingdom 4000 1983 management consulting
FSP Consulting Services Limited www.fsp.coFounded in 2012, FSP Consulting Services (FSP) are a leading digital transformation specialist, combi United States 310 2012 information technology & services
Bridewell Consulting Limited www.bridewell.com Bridewell is the trusted cyber security partner for organisations operating within Critical National Infra United States 300 2013 computer & network security
Emperor Design Consultants Limited www.emperor.works Emperor is a Certified B CorporationÂ® and one of the UK's leading employee-owned creative commu United Kingdom 500 1996 design
FRANCISCO PARTNERS CONSULTING http://www.franciscopartners.com Francisco Partners is a leading global investment firm that specializes in partnering with technology a United Kingdom 240 1999 venture capital & private equity
Bradfield Consulting http://www.bradfieldconsulting.net Bradfield consulting is a professional service firm created to provide human resource solutions for or United Kingdom 7 management consulting
Zafiro Consultancy http://www.getzafiro.com At Zafiro we specialize in helping highly innovative small and medium-sized companies win funding fr United Kingdom 6 management consulting
OpenSymmetry Consulting http://www.opensymmetry.com OpenSymmetry is a global consulting company specializing in the planning, implementation, and opti United Kingdom 170 2004 management consulting
OXFORD INNOVATION CONSULTING http://www.sqwgroup.com At SQW Group, everything we do is about making society a better place to live and work. For over 40 ye United Kingdom 12 1983 management consulting
Pedersen Consultancy http://www.pedersenandpartners.com Pedersen & Partners is a leading global Executive Search and Leadership Consulting firm. We operate United Kingdom 470 2001 staffing & recruiting
Oxera Consulting htp://www.oxera.com We advise companies, policymakers, regulators and lawyers on any economic issue connected with c United Kingdom 290 1982 management consulting
Audtax Accountants & Tax Consultants http://www.audtax.co.uk AudTax provides accountancy,bookkeeping and tax consultancy services to small-medium sized busi United Kingdom 8 2016 accounting
Ninety Consulting http://www.ninety.com Ninety Innovation is focused on improving lives by innovating the future of insurance by equipping wit United Kingdom 22 2011 insurance
Albida Consulting http://www.albida.com Albida's core focus is business transformation. Our approach includes a review of the Operating Mod United Kingdom 42 2018 management consulting
INFOCUS CONSULTANTS http://www.impactinfocus.com We strengthen our partners' skills and capabilities to make a greater difference in the world. inFocus i United Kingdom 16 2010 management consulting
MALFAUR LONDON CONSULTING LIMITED We mesh with your team to analyze the operation, develop and implement solutions that significantly United Kingdom 450 1991 management consulting
Margo Consulting More than a simple IT consulting group, MARGO is an alchemy of talents with constantly enriched exp United Kingdom 360 2005 information technology & services
Vision Consultancy Services At VISION, we improve collaboration in four areas. We mobilise people to achieve ambitious goals fas United Kingdom 260 1984 management consulting
Kline Consulting EuropeKline + Company is a global market research + advisory firm with core competencies in the Specialty United Kingdom 370 1959 management consulting
Land Use Consultants LUC is an award-winning environmental consultancy that aims to make a difference. With nearly 60 y United Kingdom 360 1966 architecture & planning
FSP Consulting Services Limited Founded in 2012, FSP Consulting Services (FSP) are a leading digital transformation specialist, combi United States 310 2012 information technology & services
Oxera Consulting We advise companies, policymakers, regulators and lawyers on any economic issue connected with c United Kingdom 320 1982 management consulting
MA FINANCIAL CONSULTANCY LIMITED MA Financial Group is a global alternative asset manager specialising in private credit, real estate and United Kingdom 340 2009 financial services
FRANCISCO PARTNERS CONSULTING Francisco Partners is a leading global investment firm that specializes in partnering with technology a United Kingdom 260 1999 venture capital & private equity
RBS CA AUDITORS & CONSULTANTS http://www.rbsca.com RBSCA is a firm of Chartered Accountants with offices in Canary Wharf, London. Our clients are sprea United Kingdom 12 1980 accounting
Fusion Consulting Fusion Consulting is a global IT and management consultancy. We aim at long-term partnerships with United Kingdom 300 2012 information technology & services
Costello Medical Consulting Limited At Costello Medical, we enjoy building lasting partnerships in the healthcare sector by providing exce United Kingdom 410 2008 pharmaceuticals
PURVIEW CONSULTANCY SERVICES Purview is a premier provider of IT Engineering and Talent Solutions to mid-market and Fortune 500 co United Kingdom 290 2010 information technology & services
Integration ConsultancyA Integration Consulting is a consultoria de estrategia e gestao focada em solucoes imple United Kingdom 370 1995 management consulting
Integration Management Consulting Limited A Integration Consulting is a consultoria de estrategia e gestao focada em solucoes imple United Kingdom 370 1995 management consulting
Medigold Health Consultancy Limited Medigold Health is one of the UK's most respected and established providers of occupational health a United States 400 1998 health, wellness & fitness
Power Systems Consultants UK Limited PSC helps its global clients power a more sustainable world by applying our deep domain experience United States 310 1995 utilities
Carmichael Engineering & Consulting Limited At Carmichael, our dedication to excellence in HVAC maintenance and service is at the core of everyt United Kingdom 420 1922 facilities services
Bridewell Consulting Limited Bridewell is the trusted cyber security partner for organisations operating within Critical National Infra United States 300 2013 computer & network security
Tenthpin Management Consultants Limited We are a global boutique consultancy - 100% focused on Life Sciences. We create digital impact a United Kingdom 430 2017 management consulting
Fusion Consulting www.fusion-cons.com Fusion Consulting is a global IT and management consultancy. We aim at long-term partnerships with United Kingdom 300 2012 information technology & services
Emergo Consulting Limited www.emergobyul.com Emergo provides quality and regulatory compliance consulting to medical device and IVD companies. United Kingdom 260 1997 professional training & coaching
Fichtner Consulting Engineers Fichtner is one of the world's leading independent engineering consultancy firms. Founded in 1922, t United Kingdom 440 1991
Kaizen UK Consulting Limited Kaizen Institute partners side-by-side with clients to help them improve sales quality, cost, delivery, s United Kingdom 470 1985 management consulting
Sygnia Consulting UK Limited Sygnia is a cyber technology and services company, providing high-end consulting and incident respo United Kingdom 270 2015 computer & network security
Genesis Oil and Gas Consultants Genesis is a market-leading advisory company focused on providing high-value technical and advisor United Kingdom 430 1988 management consulting
Prudent Consultancy United Kingdom 320 1998 information technology & services
S-RM INTELLIGENCE AND RISK CONSULTING LIMITED S-RM is a global intelligence and cyber security consultancy. Founded in 2005, we have 400+ practitio United Kingdom 360 2005 security & investigations
Emergo Consulting Limited Emergo provides quality and regulatory compliance consulting to medical device and IVD companies. United Kingdom 260 1997 professional training & coaching
Emperor Design Consultants Limited Emperor is a Certified B CorporationÂ® and one of the UK's leading employee-owned creative commu United Kingdom 500 1996 design
infosys https://www.infosys.com/ Infosys Limited is an Indian multinational specializing in digital services, IT consulting, and outsourcin UK 3000 Information Technology (IT) Services & Consulting
Qualient Solutions https://www.qualientsolutions.com/ Qualient Solutions is a technology consulting and product engineering firm that helps organizations a UK 1000 IT
Bain & Company, Inc. https://www.bain.com/ Bain & Company is an American management consulting company headquartered in Boston, Massac United Kingdom 300 1976 Management Consultancy Company
McKinsey & Company https://www.mckinsey.com/careers/search-jobs?page=2&cities=London McKinsey & Company is an American multinational strategy and management consulting firm that off United Kingdom 50 1926 Consulting Firm
Tata Consultancy Services https://www.tcs.com/ Tata Consultancy Services (TCS) is a global leader in IT services and consulting, operating in over 46 c India 602000 1968 IT Services and IT Consulting
Fichtner Consulting Engineers www.fichtner.co.uk Fichtner is one of the world's leading independent engineering consultancy firms. Founded in 1922, t United Kingdom 440 1991
Carmichael Engineering & Consulting Limited www.carmichael-eng.ca At Carmichael, our dedication to excellence in HVAC maintenance and service is at the core of everyt United Kingdom 420 1922 facilities services
Medigold Health Consultancy Limited www.medigold-health.com Medigold Health is one of the UK's most respected and established providers of occupational health a United States 400 1998 health, wellness & fitness
Land Use Consultants www.landuse.co.uk LUC is an award-winning environmental consultancy that aims to make a difference. With nearly 60 y United Kingdom 360 1966 architecture & planning
Power Systems Consultants UK Limited www.pscconsulting.com PSC helps its global clients power a more sustainable world by applying our deep domain experience United States 310 1995 utilities
DART SECURITY http://www.dart.com.sg DART is a leading cybersecurity training and consultancy company. We enhance our clients' cyber ca United Kingdom 31 2018 computer & network security
Pathlight Associates http://www.pathlight.associates What we doWe are a specialist professional services firm providing consulting and assurance service United Kingdom 20 2013 management consulting
CM GEOMATICS http://www.cmgeomatics.co.uk CMGeomatics is a specialist coastal and offshore hydrographic, geophysical and geotechnical data p United Kingdom 1 2017 oil & energy
US & HHM http://www.hhmassociates.com At HHM Associates Limited, our purpose is to build trust in business society and solve important and United Kingdom 5 2019 management consulting
PwC UK https://www.pwc.co.uk/ PwC UK is the British member firm of PricewaterhouseCoopers International, operating as a partners Uk 36000 Tax & Legal Consulting, Deals & Transaction services
Wipro https://www.wipro.com/ Wipro Limited is an Indian multinational company headquartered in Bengaluru, originally founded in 1 UK 3000 Information Technology Consulting
Deloitte https://www.deloitte.com/uk/en.html Deloitte is a global professional services firm that specialises in consulting, auditing, tax, financial ad United Kingdom457000 1845 Consulting
Lifescience Dynamics http://www.lifesciencedynamics.com Lifescience Dynamics is an England-based business consulting company that provides services such United Kingdom 86 2004 management consulting
Orbis Advisory http://www.orbisadvisory.com We are a boutique sustainability consultancy providing Energy, Sustainability and Wellness Advisory United Kingdom 14 2018 management consulting
Bain & Company https://www.bain.com/ Bain & Company is a global management consulting firm that specialises in strategy, operations, tech United States 10 1973 Consulting
Velador Associates http://www.veladorassociates.com VELADOR ASSOCIATES - www.veladorassociates.com - +4420 7993 5206IF YOU WANT TO GO QUICK United Kingdom 14 financial services
VenGreen Solutions http://www.vengreen.co.uk Founded in 2011, VenGreen Solutions is a London based independent consulting firm with a depth of United Kingdom 7 2011 information technology & services
SR Investorshttp://www.srinvestmentsonline.com S R Investment is a financial consultancy that helps you manage your finances without any hassle. Mr United Kingdom 15 financial services
Space Doctors http://www.space-doctors.com Space Doctors (part of Human8) are a globally-recognised cultural and creative consultancy fuelled b United Kingdom 43 2001 management consulting
SMARTR365 FINANCE http://www.smartr365.com Mortgage technology CRM and platform Smartr365 unites mortgage advisers and state-of the-art tech United Kingdom 48 2016 information technology & services
SMARTAX http://www.smartax.co.uk We are a firm of Chartered Tax Advisers and Chartered Certified Accountants based in Harrow, Middle United Kingdom 6 2014 accounting
Bolashak International http://www.bolashak.com Bolashak is a market leader in the provision of Technical & Engineering solutions to Kazakhstan's Oil United Kingdom 1100 2000 oil & energy
Bluecube Cyber Security Solutions http://www.bluecubesecurity.com Blue Cube Security are one of the UK's largest independent IT and Cyber Security solutions providers. United Kingdom 23 2000 information technology & services
Quatro Solutions http://www.quatrosolutions.co.uk Quatro Solutions is a niche consultancy specialising in sustainable Commodities Trading.We are ade United Kingdom 9 1996 management consulting
PROFAD CARE AGENCY http://www.profad.org Profad Quality Investments ltd provide consultancy services for individuals, corporate businesses, pu United Kingdom 10 2008 management consulting
WEALTHMAX FINANCIAL ADVISERS http://www.wealthmax.co.uk We are a team of highly competent protection & wealth consultants with years of experience specialis United Kingdom 82 2016 insurance
Rede http://www.rede-partners.com We advise on primary fundraising, GP-led secondary transactions and strategic advisory consulting pr United Kingdom 120 2011 financial services
Business Support for UK http://www.businesshelpline.uk We provide expert advice and empathetic support to businesses and company directors. We've a wea United Kingdom 16 financial services
Brown Earth Technologies UK http://www.brownearthtech.co.uk We provide multi-discipline technology consultancy to Enterprises to maximise profitability & optimis United Kingdom 5 2015 management consulting
LCM Partnershttp://www.lcmpartners.eu LCM Partners is one of Europe's leading alternatives investment management firms. We are widely re United Kingdom 59 1998 financial services
Lagan Energy Engineering http://www.laganenergyeng.com Lagan Energy Engineering Ltd provides quality assured electrical engineering, contracting and consult United Kingdom 24 2009 oil & energy
Kin&Co Enterprises http://www.kinandco.com Kin&Co is a disruptive consultancy specialising in purpose and culture led change-management. We United Kingdom 34 2016 management consulting
VoucherCarthttp://www.vouchercart.com VoucherCart is the market's leading voucher and gift card technology provider for businesses - a clou United Kingdom 16 2013 information technology & services
Volterra http://www.volterra.co.uk Volterra is an established economic consultancy who provide creative solutions across a wide range United Kingdom 22 1998 management consulting
Verlingue http://www.verlingue.co.uk Verlingue Limited is a leading UK Chartered Insurance Broker and Employee Benefits consultant provi United Kingdom 140 2015 insurance
More Grouphttp://www.moregroup.com Welcome to More Group, a global practice of accounting, international tax and corporate service spec United Kingdom 21 2005 financial services
Africa Mattershttp://www.africamatters.com In June of 2023, Africa Matters Limited was acquired by J.S. Held, a global consulting firm providing te United Kingdom 11 1997 management consulting
Admiral Markets UK http://www.admiralmarkets.com Admirals is an England-based financial services company that provides forex consultation, analytics, United Kingdom 640 2001 financial services
Eco-Age http://www.eco-age.com Eco-Age is an integrated strategy consultancy creating systemic solutions in line with science, in har United Kingdom 38 2009 management consulting
Eccleston Associates http://www.ecclestonassociates.com Eccleston Associates is a London-based, premium, boutique strategy consultancy covering the full in United Kingdom 17 2020 management consulting
Minton Treharne & Davies http://www.minton.group The Minton Treharne & Davies Group provide scientific consultancy, surveying and testing services to United Kingdom 88 oil & energy
Xodus Grouphttp://www.xodusgroup.com As a global energy consultancy, we unite our unique and diverse people to share knowledge, innovate United Kingdom 650 2005 oil & energy
Xalient Holdings http://www.xalient.com Xalient combines transformative, software-defined network, security and communication technologi United Kingdom 200 2015 information technology & services
Stanhope Capital http://www.stanhopecapital.com Founded in 2004 by Daniel Pinto, Stanhope Capital Group currently oversees in excess of USD 40 billi United Kingdom 110 2004 investment management
STELLEN INFOTECH http://www.stelleninfotech.com Stellen Infotech is a global software development and technology services company serving the indus United Kingdom 120 2011 information services
Elixirr International Plc http://www.elixirr.com Elixirr is an England-based consulting firm that provides services including business strategy and appl United Kingdom 620 2009 management consulting
Eliassen Group http://www.eliassen.com Eliassen Group is a leading strategic consulting company that provides business, clinical, and IT servi United Kingdom 1300 1989 management consulting
Electra http://www.electranetworks.co.uk Electra Networks Ltd is a market leading systems integration specialist company offering the highest q United Kingdom 40 telecommunications
S.R. Investment http://www.sr-investmentpartners.com Who We Are SR Investment partners are driven by financial service's needs, influences, and United Kingdom 13 management consulting
Challenge Group Brokers http://www.challenge-gi.com The brand name Challenge Group consolidates six companies providing its clients with and complex r United Kingdom 18 2007 insurance
CEG Europehttp://www.ceg-global.com CEG applies expertise in economics to address complex competition cases, regulatory issues and dis United Kingdom 26 2007 management consulting
Carillion Communications http://www.carillion.com As a leading UK audio visual (AV) company, Carillion Communications offers tailored and efficient sol United Kingdom 65 1993 information technology & services
Capital Integrated Services http://www.raas.co.in Integrated Capital Services Limited (ICSL) is a limited liability company with its securities listed at the United Kingdom 13 1993 financial services
Candesic http://www.candesic.com Candesic is a leading specialist healthcare, pharma & life sciences and medtech management consu United Kingdom 59 2002 management consulting
Canon Europe http://www.canon-europe.com We are Canon Europe. We are the world's best imaging company. This page represents our offices in E United Kingdom182000 1937 information technology & services
HBP Advisershttp://www.hbpworld.com For three decades, HBP (Hospital Based Physician) has provided consulting and management service United Kingdom 7 1982 management consulting
Erlang Solutions http://www.erlang-solutions.com Erlang Solutions is a global technology company offering a unique mix of expert technical capabilities, United Kingdom 140 1999 information technology & services
Envance http://www.envanceuk.com We believe that a better future for people and the planet doesn't have to be at the expense of success United Kingdom 12 2020 management consulting
Entrust Professional Services http://www.entrust-services.com Entrust is a leading multi - disciplinary planning, environmental and visualisation technology consulta United Kingdom 17 2008 environmental services
Tax Link http://www.tax-link.com Tax Link is a firm of Chartered Tax Advisors & Accountants based in Wimbledon offering accounts, tax United Kingdom 42 1993 accounting
Taxpoint Direct http://www.taxpointdirect.com Taxpoint Direct Ltd. is one of the London's Most fastest growing Accountancy firm that delivers a varie United Kingdom 24 2005 accounting
Talink http://www.talink.io Talink is a technology consulting firm operating in UK, Ireland, NZ and India - helping clients by: :: Prov United Kingdom 38 2016 information technology & services
Tasman Analytics http://www.tasman.ai Tasman is a boutique analytics consultancy transforming disorganised data into meaningful business United Kingdom 25 2017 internet
T S PATARA & CO http://www.patara.co.uk Chartered Accountants, Taxation Consultants, Business Advisers and Registered Auditors providing p United Kingdom 9 1986 accounting
Synpulse UKhttp://www.synpulse.com Synpulse is an international management consulting and technology company, and valued partner of United Kingdom 1200 1996 management consulting
Next Geosolutions UKCS http://www.nextgeo.eu Next Geosolutions (NextGeo) is an international marine geoscience and offshore construction suppor United Kingdom 140 2014 oil & energy
Nbt Growthhttp://www.nbtdigital.com NBT is a global growth consultancy firm that has established itself as a Platinum Partner of Hubspot a United Kingdom 27 2015 management consulting
Narec Distributed Energy http://www.decerna.co.uk Decerna is a specialist commercial sustainability consultancy. We have operated for ten years within United Kingdom 20 2012 management consulting
Marcloud http://www.marcloudconsulting.com MarCloud is a leading marketing automation consultancy and Salesforce partner specialising in Pard United Kingdom 25 2017 management consulting
Mannaz A/Shttp://www.mannaz.com We partner with great clients to unleash untapped potential within organisations. We build capabilitie United Kingdom 140 1975 professional training & coaching
Horizon Strategy http://www.horizonstrategy.io Horizon Strategy is a consultancy whose mission is to reinvent and democratise strategic advice.This United Kingdom 20 2020 management consulting
Hilton Financial Management http://www.hiltonfinance.co.uk With nearly 30 years of financial services experience we have built extensive links within the industry United Kingdom 5 financial services
Ethos Farmhttp://www.ethosfarm.com Award-winning Customer Experience and Employee Experience consultancy with offices in London an United Kingdom 220 2017 consumer services
Alta Advisershttp://www.altawealthadvisors.com We offer strategies to delve into matters of consequence to your financial future that others might ver United Kingdom 7 2018 financial services
Alseda UK http://www.alseda.eu alseda Consulting is a company within the financial services industry providing a wide range of servic United Kingdom 29 2003 management consulting
MG Group http://www.mggroup.co.uk MG Group is a multi-disciplinary practice providing accounting, tax, audit, legal and business consulti United Kingdom 78 2007 accounting
Metricell http://www.metricell.com Metricell is on a mission to deliver connectivity. We work with our customers in the telecommunicatio United Kingdom 82 2007 telecommunications
The Marketing Store Worldwide http://www.tmsw.com tms unites technology and marketing and sourcing to drive transformational change for the world's le United Kingdom 2400 1986 management consulting
Secarma http://www.secarma.com Secarma Limited is an established, independent security consultancy, specialising in Information Se United Kingdom 26 2001 computer & network security
Scrum Inc UKhttp://www.scruminc.com Scrum Inc. is the foremost consultancy helping business leaders around the globe achieve business United Kingdom 92 1995 management consulting
Sancroft International http://www.sancroft.com Sancroft is an award-winning sustainability consultancy based in London. For 25 years we have worke United Kingdom 38 1997 management consulting
Collabora http://www.collabora.com Collabora is a global consultancy specializing in delivering the benefits of Open Source software to th United Kingdom 140 2005 information technology & services
Cognitive-Edge http://www.thecynefin.co The Cynefin Company enable individuals and organisations to navigate and make sense of uncertaint United Kingdom 25 2005 management consulting
NIHILENT http://www.nihilent.com Nihilent is a Global Consulting and Services Company using a human-centred approach for problem- United Kingdom 1900 2000 management consulting
Nicholson Search and Selection http://www.nicholsonsas.com Finding great people with the functional skills, market knowledge and the right personality, is what we United Kingdom 22 2005 staffing & recruiting
Complyporthttp://www.complyport.com Welcome to Complyport - member of ComplyMAP Group!Complyport is the leading City-based compl United Kingdom 45 2001 financial services
Nyman Libson Paul http://www.nlpca.co.uk At NLP we have over 80 years of experience offering audit, accountancy, consultancy and general prof United Kingdom 97 1933 accounting
Numeritas http://www.numeritas.co.uk Numeritas is a London based financial modelling consultancy. We have enjoyed a decade of success United Kingdom 15 2003 management consulting
Nordens http://www.nordens.co.uk At Nordens, we get it - we really do. Running a business is tough work and keeping tabs on the books c United Kingdom 63 2002 accounting
Firestarter Business Solutions http://www.firestartersolutions.co.uk At Firestarter, we help organisations to sell more of whatever they sell. Working with a broad range of c United Kingdom 13 2012 management consulting
Aurexia http://www.aurexia.com AUREXIA is a management consulting firm located in Paris, Nantes, London, Luxembourg, Hong-Kong United Kingdom 140 2006 management consulting
Atmos Lab http://www.atmoslab.io In a context where human impact is leaving a costly imprint on its homeland, Atmos Lab helps archite United Kingdom 8 2016 environmental services
INSIGHT222http://www.insight222.com Insight222 is a specialist professional services firm headquartered in London, UK and with employe United Kingdom 25 2017 human resources
ArithmosTechhttp://www.arithmostech.com Arithmos is a Consulting, Technology and Services company for the Life Sciences industry.We suppor United Kingdom 69 2010 management consulting
Milliman http://www.milliman.com Milliman is among the world's largest independent actuarial and consulting firms. Founded in Seattle United Kingdom 4100 1947 management consulting
Perrett Laverhttp://www.perrettlaver.com Global Leaders for Global ChallengesPerrett Laver is a leading global executive search firm advising o United Kingdom 190 2001 management consulting
Paramount Plants and Gardens http://www.paramountplants.co.uk Leading UK specialists based on North London / Herts/ Lincolnshire in supply of mature trees includin United Kingdom 10 1995 retail
SILICON TECHNIX http://www.silicontechnix.co.uk We are providing business solutions & consultancy services in the field of Information Technology spe United Kingdom 14 2008 information technology & services
Servicom http://www.servicom.co.uk Our expertise brings together traditional land mobile two-way radio with cutting edge data solutions in United Kingdom 22 1989 telecommunications
Beaumont Bailey Executive Search http://www.beaumontbailey.com Beaumont Bailey is an executive search and leadership consulting firm with a comprehensive track re United Kingdom 19 2019 management consulting
Barcud Shared Services http://www.barcudsharedservices.org.uk Barcud Shared Services was created in 2012 by a group of four Welsh large scale voluntary transfer (L United Kingdom 9 2012 management consulting
James Andrews Recruitment Solutions jarsolutions.co.uk Working collaboratively with our clients to connect them with the right talent, at the right time, is what GB 110 2009 Staffing and Recruiting
CT Group Trading http://www.ctgroup.com The CT Group is a global consultancy that uniquely combines research, intelligence, campaigns and a United Kingdom 200 2002 management consulting
Cook's Street htp://www.cookstreetconsulting.com Cook Street has been providing investment advisory and fiduciary services to clients since 1999. We United Kingdom 29 1999 financial services
Coulter http://www.coulterpartners.com We are executive search and leadership development specialists working to build a better future. As United Kingdom 120 2003 management consulting
Biz Accounting http://www.bizaccountingltd.com Biz Accounting Ltd is a quality provider of tax, bookkeeping, accounting, and payroll services. We cove United Kingdom 9 2010 accounting
BILGE ADAM TECHNOLOGIES UK http://www.bilgeadamtechnologies.com BilgeAdam Technologies are award-winning leaders in IT services and specialists in providing optimu United Kingdom 130 1997 information technology & services
Bernstein Autonomous http://www.autonomous.com Autonomous Research is the leading, independent global financial sector research firm. We carry out United Kingdom 69 2009 financial services
BEYONDLABORATORY http://www.beyondlaboratory.com Beyondlaboratory Ltd (Beyond Lab), was established in 2014. Different to other consultant company, United Kingdom 6 2014 management consulting
Progressive Technology Solutions http://www.progressive-tsl.com Progressive TSL is a leading Business Systems and Solutions Consultancy dedicated to handling the c United Kingdom 28 2004 information technology & services
ACCESS INFINITY http://www.accessinfinity.com Access Infinity exists to help pharma companies confront their challenges head-on. We began as a co United Kingdom 90 2014 management consulting
6B Digital http://www.6b.digital 6B is a technology and engineering consultancy dedicated to making sense of big, complex technolog United Kingdom 49 2014 information technology & services
DATATONIChttp://www.datatonic.com The leading cloud data + AI consultancy, driving business impact for the world's most ambitious busin United Kingdom 180 2013 information technology & services
Dartmouth Partners http://www.dartmouthpartners.com Dartmouth provides new graduate staffing and recruitment consulting services for businesses and in United Kingdom 160 2012 staffing & recruiting
Penspen http://www.penspen.com Penspen is a global team who design, maintain, and optimise energy infrastructure to improve access United Kingdom 910 1954 oil & energy
spot on minds http://www.spotonminds.com spot on minds Ltd is a boutique executive search and management consultancy firm founded in 2006 United Kingdom 7 2006 human resources
Spencer Gardner Dickins http://www.sgduk.com SGD are a leading firm of accountants and tax advisers offering bespoke tax and accounting advice.Es United Kingdom 21 2004 accounting
Sopher + Cohttp://www.sopherco.com Sopher + Co is one of the most entrepreneurial and progressive firms of accountants, business advise United Kingdom 170 1975 accounting
Solytics Partners UK http://www.solytics-partners.com We are a global analytics firm focused on solving client problems through an amalgamation of advanc United Kingdom 250 2019 financial services
SME Advantage http://www.smeadvantage.co.uk SME Advantage was founded by two veterans of business. Both are multiple business owners, both ha United Kingdom 5 2021 information technology & services
SMARTER SOFTWARE SOLUTIONS http://www.business-smart.co.uk Business Smart helps hotels, restaurants and food distributors with Workforce Management, ERP and United Kingdom 15 2013 information technology & services
Smartech Service http://www.smartechservice.co.uk Smartphone device refurbishment, salvage and consultancy. United Kingdom 8 2018 telecommunications
SMART EDUCATORS http://www.smarted.co.uk SMART Education is a specialist consultancy focusing exclusively on the Education sector. We work e United Kingdom 36 2015 staffing & recruiting
Bosch Global Associates http://www.boschglobal.com Bosch Global Associates (BGA) is an Executive Search Consultancy working within the Life Sciences a United Kingdom 8 2013 staffing & recruiting
Black & Veatch http://www.bv.com Black & Veatch is an employee-owned, global leader in building critical human infrastructure in Energ United Kingdom11000 1915 environmental services
Sullivan & Stanley http://www.sullivanstanley.com Sullivan & Stanley is an award-winning specialist change consultancy that deploys expert teams to so United Kingdom 140 2016 management consulting
Xplus Londonhttp://www.xpluslondon.com AAT Licensed Accountants. THE GOAL & VISIONOur mission statement is to offer a personalised and United Kingdom 9 accounting
Xenergie http://www.xenergie.com Xenergie enables organisations to release their Social Energy. This is the ability of people and teams t United Kingdom 19 2000 management consulting
WIS Accountancy http://www.wisaccountancy.co.uk If you're a landlord, contractor, freelancer or run a small business, you've found the perfect one-stop s United Kingdom 39 2009 accounting
West Monroe Partners http://www.westmonroe.com West Monroe is a digital services firm that was born in technology but built for business-partnering United Kingdom 2400 2002 management consulting
Bryter http://www.bryter.com BRYTER is the leading no-code platform to automate expert knowledge. The platform's intuitive toolbo United Kingdom 110 2018 information technology & services
BOYDEN EXECUTIVE SEARCH http://www.boyden.com Transforming today's organisations with tomorrow's leaders.Building high performing leadership team United Kingdom 1100 1946 management consulting
Brandpie Digital htp://www.brandpie.com We are an independent consultancy specializing in purpose-driven transformation. Combining the po United Kingdom 75 2008 management consulting
Videopluggerhttp://www.videoplugger.com Pioneering digital content distribution agency with a truly international vision.Established in 2004, Vid United Kingdom 11 2004 media production
Valve & Pipework Systems http://www.acvalvealliance.com At the AC Valve Alliance Group, our mission is to provide end-to-end valve and automation solutions f United Kingdom 47 1997 oil & energy
Advance Management http://www.advancemanagementukltd.com ADVANCE MANAGEMENT (UK) LTD is a management consulting company based out of 217 BOLTON United Kingdom 9 management consulting
ADDSOFT SOLUTIONS http://www.addsofttech.com Addsoft Technologies (P) Ltd. is a young enterprise powered by young engineers with a goal of adding United Kingdom 84 information technology & services
Eco http://www.ecoltdgroup.com E Co. is an international climate finance and development consultancy, uniquely specialised in the d United Kingdom 510 2000 management consulting
Dynamic Futures http://www.dynamicfutures.co.uk DYNAMIC FUTURES DELIVERING STATEMENT OF WORK CONSULTANCY SINCE 2005Dynamic Future United Kingdom 36 2005 management consulting
MONSOONhttp://www.monsoonlondon.com People always ask us if Monsoon is a design studio, a dev shop, a marketing house, or a strategic con United Kingdom 13 2001 information technology & services
MONI GROUPhttp://www.monigroup.com MONI (a Tag Company) is an award winning, digital commerce experience agency, providing e-comm United Kingdom 29 2004 information technology & services
Momentum Transport Planning http://www.momentum-transport.com Momentum Transport Consultancy is a progressive, people-first transport consultancy providing trans United Kingdom 47 2012 management consulting
Green Element http://www.greenelement.co.uk Green Element is an Environmental Management Consultancy based in London and Edinburgh. We ar United Kingdom 27 2006 environmental services
Subex UK http://www.subex.com Subex is a pioneer in enabling Digital Trust for businesses across the globe.Founded in 1994, Subex h United Kingdom 1700 1992 telecommunications
SUNRISE IMMIGRATION http://www.sunriselegalservices.com Sunrise International is the brand name of Sunrise Immigration Consultants Pvt. Ltd. It is one of most United Kingdom 35 1995 higher education
CFGI http://www.cfgi.com CFGI is a unique and highly specialized financial consulting firm that is strategically positioned to hel United Kingdom 1100 2000 management consulting
Capacitas http://www.capacitas.co.uk Founded in 2002 and based in London, Capacitas is the only consulting firm specialising exclusively i United Kingdom 94 2002 information technology & services
Cantarus http://www.cantarus.com We're Cantarus, an independent agency structured to enable us to invest in our relationships with clie United Kingdom 64 2003 information technology & services
LIMRA SERVICES http://www.limra.com LIMRA is a worldwide research, consulting, and professional development organization that helps mo United Kingdom 530 1916 financial services
LeadFabric Solutions http://www.leadfabric.com Since 2008 LeadFabric has been a pioneer in aligning the sales and marketing operations of their clie United Kingdom 33 2008 management consulting
MUNIR TATAR T/A Munir Tatar Associates http://www.munirtatar.com Chartered Accountants, Tax Advisors and Statutory Auditor based in London. A team of 40 profession United Kingdom 25 1982 accounting
MUFG FUND SERVICES http://www.mufg-investorservices.com We're more than just fund administration. Our offerings include a scope of solutions not historically p United Kingdom 1800 2013 financial services
MTM Londonhttp://www.wearemtm.com MTM is the trusted insight and strategy partner tackling the biggest challenges for the world's biggest United Kingdom 230 2006 management consulting
Alberon http://www.alberon.co.uk We are an Oxford-based company that specialises in developing bespoke software and web applicati United Kingdom 10 2001 information technology & services
Albany Beck Worldwide http://www.albanybeck.com Albany Beck helps clients overcome challenges, explore opportunities and improve services through United Kingdom 250 2005 management consulting
Vintura UK http://www.vintura.com Vintura is a leading strategy consultancy company specialized in life sciences and healthcare across United Kingdom 58 2000 management consulting
Knight R& Dhttp://www.knightrd.com We are specialist consultants in the area of R&D tax relief. At Knight R&D we work as part of your tea United Kingdom 20 2016 financial services
Veracity OSI UK http://www.veracityconsulting.co.uk Veracity is a boutique consultancy specialising in the provision of managed services across both publi United Kingdom 25 2013 management consulting
Boster Grouphttp://www.bostergroup.com Boster Group is an award-winning independent marketing consultancy that creates innovative brand United Kingdom 7 2001 management consulting
VI360 http://www.vi360.com VI360 is a brand identity management consultancy. We help clients realise the true value from their vi United Kingdom 6 2003 management consulting
Sonovate http://www.sonovate.com Sonovate's culture of innovation, inclusivity, and customer centricity makes it the leading provider of f United Kingdom 170 2013 financial services
State of Fluxhttp://www.stateofflux.co.uk State of Flux is a global procurement and supply chain consultancy headquartered in London, UK. We United Kingdom 60 2004 management consulting
Bridgepoint Alliance http://www.bridgepointconsulting.com Bridgepoint Consulting, an Addison Group company, is a leading management consulting firm that off United Kingdom 260 1999 management consulting
Algolia http://www.algolia.com Algolia is the world's only end-to-end AI search and discovery platform. The company delivers a combi United Kingdom 760 2012 information technology & services
Risk Factoryhttp://www.riskcrew.com Risk Crew is known for their vision, innovative thinking and facility to embrace change. Given the cons United Kingdom 11 2010 information technology & services
HALLIWELL NEWS http://www.halliwellglobal.com Founded in 1954, Halliwell is a premier multi-service Engineering, Forensic Architecture, and Constru United Kingdom 120 1954 insurance
Wyoming Interactive http://www.wyoming-interactive.com Wyoming is a full-service digital transformation consultancy with active projects in UK, Europe and US United Kingdom 33 2008 information technology & services
Speedster-IThttp://www.speedster-it.com Speedster IT is a London-based company that specializes in helping small-to-medium sized business United Kingdom 38 2003 information technology & services
SRC INFRASTRUCTURE http://www.srcinfrastructure.com SRC Infrastructure has been providing project management and engineering advisory, consultancy an United Kingdom 120 2003 management consulting
Aerotrope http://www.aerotrope.com EXPERT ENGINEERING + INNOVATIVE DESIGN: WIND TURBINES | LOW CARBON VEHICLES | ARTWO United Kingdom 7 2005 management consulting
LCE http://www.lce.com Life Cycle Engineering (LCE) provides consulting, engineering, information technology and education United Kingdom 540 1976 management consulting
Direx Solutions http://www.direxsolutions.com Operating worldwide from bases in London, Dubai, Sydney and Toronto, we provide strategic advisory United Kingdom 19 2001 management consulting
e2y http://www.e2ycommerce.com e2y (an NTT company) is an award-winning digital experience, enterprise commerce and marketplace United Kingdom 38 2014 information technology & services
Best4business Accountants & Company http://www.best4business.com We are an independent and forward-thinking firm of accountants, consultants and practitioners, offer United Kingdom 33 2003 accounting
Social 360 http://www.social360monitoring.com Social360 is a leading online media monitoring and analysis company, working with some of the bigge United Kingdom 19 2009 information technology & services
Berylls Strategy Advisors http://www.berylls.com The Berylls Group unites expertise in strategy consulting and implementation , data-driven marketing United Kingdom 240 2011 management consulting
Better Decision Groups http://www.bdg.io Game changing insights for better decisionsWe are the better decisions group (bdg), an international United Kingdom 84 2004 information technology & services
Buckinghamshire New University http://www.bucks.ac.uk Buckinghamshire New University has enjoyed a long and successful history since it was founded in 18 United Kingdom 1500 1891 higher education
Business Integration Partners SPA http://www.bip-group.com A network of thinkers, creatives and creators. An ecosystem made of insights, skills and research. Ske United Kingdom 196000 2003 management consulting
Prince Minerals http://www.princecorp.com From custom blends to lost circulation materials, engineered solutions for shale drilling to unconventi United Kingdom 24 1947 oil & energy
Leadenhall Search and Selection http://www.leadenhallsearch.co.uk Placing Advisory, Strategy, Data, Tech, Risk & Finance professionals across Management Consulting United Kingdom 26 2016 staffing & recruiting
Egon Zehnder http://www.egonzehnder.com Egon Zehnder is the world's preeminent leadership advisory firm, inspiring leaders to navigate comple United Kingdom 3200 1964 management consulting
Volans Ventures http://www.volans.com Volans is a think-tank and advisory firm operating at the leading edge of sustainability and innovation t United Kingdom 61 2008 management consulting
Waferwire UKhttp://www.waferwire.com Established in 2010, WaferWire Cloud Technologies is a Bellevue, WA based technology consulting c United Kingdom 72 2010 information technology & services
WSP Grouphttp://www.wsp.com We exist to future-proof our cities and environments. As one of the world's leading professional servic United Kingdom 70000 1885 professional training & coaching
ABL Londonhttp://www.abl-group.com ABL Group is a leading global independent energy and marine consultant working in energy and ocean United Kingdom 1300 1856 computer software
Abraham Accountants http://www.abrahamaccountants.com Abraham Accountants Ltd is an accounting company based out of 46 Houghton Pl, Bradford, United K United Kingdom 9 2001 accounting
ABS 12 http://www.abs.in Affordable Business Solutions offers business solutions and analytics consulting services for SMEs in United Kingdom 110 2004 management consulting
QED Energyhttp://www.qedea.com QED Energy Associates proudly provides excellence in reservoir engineering technician services. Whe United Kingdom 15 2010 oil & energy
ABM GLOBAL COMPLIANCE http://www.abmglobalcompliance.com ABM Global Compliance specializes in providing financial services to various compliance firms, whos United Kingdom 50 2013 financial services
Prime Energy Markets http://www.primeenergymarkets.com Prime Energy Markets (P.E.M) is a privately owned proprietary oil and consultancy trading firm, with of United Kingdom 11 2018 oil & energy
QX http://www.qxglobalgroup.com QX Global Group is a global consulting, digital transformation, and business process management (B United Kingdom 2700 2003 outsourcing/offshoring
Purple Beardhttp://www.purplebeard.co.uk We bridge the digital skills gap through tailored blended learning programs, Apprenticeships and Trai United Kingdom 26 2019 higher education
Q Management Services http://www.qmanagement.nl Q management is dedicated to organisations, management and leadership.We are consultants and in United Kingdom 16 1981 management consulting
Bexprt http://www.bexprt.com Bexprt - Your cloud business partner. Specialising in Advanced Analytics, Generative-AI, Resilienc United Kingdom 24 2018 management consulting
Pierce Washington http://www.piercewashington.com We help our clients transform their quote-to-cash process. Founded in 2005, we have enabled leadin United Kingdom 68 2005 information technology & services
Hakluyt & Company http://www.hakluytandco.com Hakluyt is a global strategic advisory firm, founded in 1995, that supports corporate leaders and inves United Kingdom 190 1995 management consulting
H2o IT http://www.h2o-networks.co.uk First Class Immediate IT Support & Solutions for Professional Fast Growing Companies.Do You Want United Kingdom 6 2001 computer & network security
PM Alliancehttp://www.pm-alliance.com http://www.pm-alliance.comPMAlliance, Inc. is an international project management consulting com United Kingdom 87 1992 management consulting
Actalent Services http://www.actalentservices.com Actalent connects passion with purpose. Our scalable talent solutions and services capabilities drive United Kingdom 10000 1983 management consulting
3d Innovations http://www.3di-ltd.com 3d innovations (3di) is a new breed of data management consultancy specialising in the financial serv United Kingdom 46 2002 financial services
Dune Advisors http://www.duneadvisors.com We are a global M&A consultancy who work alongside our clients as one team to achieve extraordinar United Kingdom 13 2015 management consulting
Digis Squaredhttp://www.digis2.com Digis Squared - Enabling smarter networksManaged Services, System Integration & ConsultingWe United Kingdom 120 2016 telecommunications
80:20 Procurement Services http://www.8020procurement.com 80:20 Procurement Services Limited are a Consultancy and Supply & Distribution Company and have United Kingdom 33 2004 oil & energy
AA Euro Recruitment UK http://www.aaeuro.com AA Euro Group are a specialist recruitment consultancy operating in a number of key locations across United Kingdom 85 2005 staffing & recruiting
ERC Evolutionhttp://www.erce.energy As a global leader in energy consulting, ERCE is committed to supporting oil & gas, new energy types a United Kingdom 83 2010 management consulting
Taxaccolegahttp://www.taxaccolega.co.uk We are a firm of Accountants and Tax Consultants regulated by ICAEW and ACCA based in Croydon, S United Kingdom 6 2011 accounting
Annapurna HRhttp://www.annapurnarecruitment.com At Annapurna, we are focused on building teams, powering growth.We provide the highest quality valu United Kingdom 120 2008 staffing & recruiting
SUGAMA http://www.sugamatechnologies.com We at Sugama Technologies are committed in helping businesses, job seekers, graduates accomplis United Kingdom 10 2021 management consulting
Patni & Co http://www.patniandco.co.uk Patni & Co Ltd with over 20 years of combined experience our firm is dedicated to making a real differ United Kingdom 13 2019 accounting
Paytriot http://www.paytriot.co.uk Paytriot Payments is a registered Payment facilitator and Digital wallet operator. We have a team with United Kingdom 22 financial services
Phinsys http://www.phinsys.com www.phinsys.comPhinsys specialises in providing innovative solutions to insurance companies finan United Kingdom 44 2010 insurance
PIRC http://www.pirc.co.uk Pensions & Investment Research Consultants Ltd (PIRC) is Europe's largest independent corporate g United Kingdom 22 financial services
Phoenix47 http://www.phoenix47.co.uk Phoenix47 is an IT infrastructure consultancy company reborn in 2017 by a dynamic new managemen United Kingdom 32 2017 information technology & services
Bank Brokers UK http://www.bankbrokers.us Bankbrokers Merchant Services specializes in benchmarking merchant data and highlighting all areas United Kingdom 6 2022 banking
FM Insurance Company http://www.fmglobal.com FM Global is a Rhode Island-based insurance company that specializes in property insurance, risk co United Kingdom 6300 1835 insurance
Forensic Risk Alliance http://www.forensicrisk.com Forensic Risk Alliance (FRA) is an international consultancy that combines deep forensic accounting, United Kingdom 220 1999 management consulting
Leicester College http://www.leicestercollege.ac.uk Leicester College is one of the leading Further Education Colleges within the UK. The College has an United Kingdom 880 education management
Y-Mobility http://www.y-mobility.co.uk We are a group of technologists, entrepreneurs, business consultants and investors that recognise th United Kingdom 20 2019 management consulting
Cathodic Protection Co http://www.cathodic.co.uk Cathodic Protection Co Limited, founded in 1950, was one of the first companies in the United Kingdo United Kingdom 51 1950 oil & energy
Cerberus Nuclear http://www.cerberusnuclear.com Cerberus Nuclear is a technical consultancy with over 100 cumulative years experience specialising i United Kingdom 18 2016 management consulting
RutterKey Solutions http://www.rutterkey.com The RutterKey Solutions Group is an ERP consulting business that offers creative ideas and holistic thi United Kingdom 66 2007 management consulting
TenIntelligence http://www.tenintel.com Our continued vision is to be the playmaker in our field; an investigation and protection consultancy, r United Kingdom 20 2012 security & investigations
Nordicity http://www.nordicity.com Strategy, Policy, and Economic AnalysisNordicity is an international consulting firm providing private a United Kingdom 40 1979 management consulting
Nosmay Telecom http://www.nosmay.com Nosmay Company Limited is a Technology and Business Solutions provider incorporated since 1999 a United Kingdom 26 1999 information technology & services
O Shaped Lawyer http://www.oshaped.com WHY - O Shaped is an organisation that is leading change across the legal industry to make it better b United Kingdom 10 2019 management consulting
oomph Agency Services http://www.oomphagency.com We help people understand people. B Corp accredited and proud to be so, we are a research, evaluati United Kingdom 16 2005 management consulting
Cotton On UKhttp://www.cottonon.com Cotton is an audit and accounting firm located in Old Town Alexandria, VA. We specialize in providing United Kingdom 380 1981 accounting
Timera Energy http://www.timera-energy.com Timera Energy provides senior consulting expertise on value and risk in European gas and power mark United Kingdom 22 2011 management consulting
IntegrationWorks EMEA http://www.integration.works IntegrationWorks helps our clients use and share data more effectively. As a recognised global leader United Kingdom 97 2005 information technology & services
Inter A&S http://www.as-telecomconsulting.com We are a one-stop shop for all the telecommunications needs of your business. A&S Telecom Consult United Kingdom 5 telecommunications
Investor Update http://www.investor-update.com Investor Update is made up of leading industry experts who are focused on equipping clients with acti United Kingdom 14 2016 capital markets
Total Accounting http://www.totalaccounting.co.uk Total Accounting is a modern accountancy firm dedicated to providing accounting solutions and busi United Kingdom 13 2004 accounting
The Fifth 9 http://www.fifth-9.com The fifth9 is a disruptive tech company offering management consulting services and digitalDNA prod United Kingdom 9 2007 management consulting
SEON TECHNOLOGIES UK http://www.seon.io SEONhttps://seon.ioAt SEON, we strive to help online businesses reduce the costs, time, and challen United Kingdom 270 2017 information technology & services
MEERALI TRADING http://www.meralisgroup.com Meralis Chartered Accountants and Registered Auditors were set up by Mahmud Merali to provide acc United Kingdom 64 1978 accounting
Hyperion Systems http://www.hyperionsystems.net Hyperion Systems Engineering is an independent provider of consulting & advisory services, systems United Kingdom 80 1993 oil & energy
IBS Software Europe http://www.ibsplc.com IBS Software is a leading SaaS solutions provider to the travel industry globally, managing mission-crit United Kingdom 5100 1997 information technology & services
IBA Group http://www.ibagroupit.com IBA Group is one of the largest IT service providers in Eastern Europe, performing software developme United Kingdom 1300 1993 information technology & services
MHA Carpenter Box http://www.carpenterbox.com Award winning Carpenter Box is one of the largest and most respected accountancy practices in the r United Kingdom 180 1923 accounting
Atech Support htp://www.atech.cloud 24 x 7 Cloud Service Provider & Managed Security Service Provider delivering technology transformati United Kingdom 130 2006 information technology & services
AVM Solutions http://www.avmsolutionsuk.com By creating an environment that allows people to be the best version of themselves we are able to cre United Kingdom 34 2007 information technology & services
Finspace Group http://www.finspacegroup.co.uk FinSpace is a fintech-driven specialist finance advisory based in London. We specialise in commercia United Kingdom 32 2018 financial services
`;

export const STATUS_COLORS: Record<JobStatus, string> = {
  [JobStatus.TO_BE_APPLIED]: 'bg-slate-100 text-slate-700 border-slate-200',
  [JobStatus.APPLIED]: 'bg-blue-50 text-blue-700 border-blue-200',
  [JobStatus.RESULT]: 'bg-purple-50 text-purple-700 border-purple-200',
  [JobStatus.NEXT_ROUND]: 'bg-amber-50 text-amber-700 border-amber-200',
  [JobStatus.DECLINED]: 'bg-red-50 text-red-700 border-red-200',
  [JobStatus.OFFER]: 'bg-green-50 text-green-700 border-green-200',
};