%% Início do grafo na direção de cima para baixo (TD = top down)
graph TD

%% =====================
%% 1. Canais de Entrada
%% =====================
%% Onde o paciente interage com o chatbot. Podem ser canais como WhatsApp, site, app, etc.
subgraph "🎛️ Plataformas de Entrada"
    WhatsApp
    WebChat
    AppMobile
    Telegram
end

%% ================================
%% 2. Segurança e Autenticação
%% ================================
%% Camada responsável por garantir que o usuário é quem diz ser.
%% Inclui autenticação com tokens e registro de atividades para auditoria.
subgraph "🛡️ Segurança e Autenticação"
    AuthService[🔐 Autenticação segura<br/>(JWT / OAuth2)]
    Logger[🕵️ Registros e auditoria de ações]
end

%% ================================
%% 3. Núcleo Inteligente do Chatbot
%% ================================
%% O "cérebro" do chatbot. Responsável por processar mensagens, entender o que o paciente quer,
%% responder perguntas, marcar consultas, enviar lembretes e detectar emergências.
subgraph "🤖 Núcleo do Chatbot"
    DialogManager[💬 Gerenciador de Conversas]
    NLP[🧠 Entendimento de Linguagem Natural]
    FAQEngine[📖 Respostas a perguntas frequentes]
    BookingAgent[📅 Agendamento de Consultas]
    MedicationManager[💊 Lembretes de Medicamentos]
    EmergencyAnalyzer[🚨 Analisador de Emergência]
end

%% ========================================
%% 4. Bases de Dados e Conhecimento
%% ========================================
%% Aqui estão as informações que o chatbot consulta para responder ao paciente
%% ou tomar decisões — como agendar uma consulta ou lembrar de um medicamento.
subgraph "📚 Dados e Conhecimento"
    FAQDB[📘 Base de perguntas/respostas]
    PatientDB[👤 Informações dos pacientes]
    ReminderDB[📋 Dados de medicamentos e lembretes]
    EmergencyLog[📝 Registros de emergências]
end

%% ========================================
%% 5. Camada de Integração (Middleware)
%% ========================================
%% Atua como ponte entre o chatbot e os sistemas hospitalares.
%% Garante que os dados estejam atualizados e as ações corretas sejam tomadas.
subgraph "🔗 Middleware e Integrações"
    APIOrchestrator[🔀 Orquestrador entre Chatbot e Sistemas Hospitalares]
    MessageQueue[📨 Execução em segundo plano<br/>(filas/eventos)]
end

%% ========================================
%% 6. Sistemas do Hospital
%% ========================================
%% Os sistemas internos com os quais o chatbot se comunica para funcionar.
%% Incluem prontuários, agendamento, recursos físicos e emergência.
subgraph "🏥 Sistemas Hospitalares"
    HIS[Sistema Administrativo Hospitalar]
    EMR[📄 Prontuário Eletrônico (EMR)]
    Agenda[📆 Agenda de médicos e salas]
    Equipamentos[⚙️ Equipamentos e recursos]
    Emergencia[🚑 Central de Emergência Hospitalar]
end

%% ========================================
%% Fluxo de Comunicação entre os Componentes
%% ========================================

%% Canais de entrada se conectam ao gerenciador de diálogo (núcleo do bot)
WhatsApp --> DialogManager
WebChat --> DialogManager
AppMobile --> DialogManager
Telegram --> DialogManager

%% O chatbot consulta o serviço de autenticação para validar o usuário
DialogManager --> AuthService
AuthService --> Logger

%% O chatbot entende a intenção do usuário via NLP e direciona para o módulo correto
DialogManager --> NLP
NLP --> FAQEngine %% Ex: perguntas simples
NLP --> BookingAgent %% Ex: "quero marcar consulta"
NLP --> MedicationManager %% Ex: "qual remédio tomar?"
NLP --> EmergencyAnalyzer %% Ex: "estou com dor no peito"

%% Módulos consultam bases de dados para agir
FAQEngine --> FAQDB
BookingAgent --> PatientDB
MedicationManager --> ReminderDB
EmergencyAnalyzer --> EmergencyLog

%% Integrações com sistemas internos via Middleware
BookingAgent --> APIOrchestrator
MedicationManager --> APIOrchestrator
EmergencyAnalyzer --> APIOrchestrator
FAQEngine --> APIOrchestrator

%% Middleware acessa os sistemas reais do hospital
APIOrchestrator --> HIS
APIOrchestrator --> EMR
APIOrchestrator --> Agenda
APIOrchestrator --> Equipamentos
APIOrchestrator --> Emergencia

%% Mensagens em segundo plano são enviadas para a fila
BookingAgent --> MessageQueue
MedicationManager --> MessageQueue
EmergencyAnalyzer --> MessageQueue
MessageQueue --> Emergencia

%% Alerta direto em caso de emergência detectada
EmergencyAnalyzer -->|⚠️ Emergência detectada| Emergencia
