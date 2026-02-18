import discord
from discord import app_commands
from discord.ui import Modal, TextInput
from datetime import datetime
from flask import Flask
from threading import Thread
import os

# --- PARTIE HÉBERGEMENT RENDER (ANTI-SOMMEIL) ---
app = Flask('')

@app.route('/')
def home():
    return "Bot en ligne ! 🚀"

def run():
    app.run(host='0.0.0.0', port=8080)

def keep_alive():
    t = Thread(target=run)
    t.start()

# --- CONFIGURATION DU BOT ---
TOKEN = 'TON_TOKEN_ICI' # Change-le car l'ancien est public !
MON_ID = 1333447906035761216 
Autre_Mod = 1071177755451994223

class RecrutementModal(Modal, title='Recrutement Staff'):
    age = TextInput(label="Âge", placeholder="Ex: 17", min_length=1, max_length=2)
    poste = TextInput(label="Poste visé", placeholder="Modérateur, Admin...")
    dispo = TextInput(label="Disponibilités", placeholder="Ex: Soirs et week-ends")
    exp = TextInput(label="Expériences", style=discord.TextStyle.paragraph, placeholder="Détaillez ici...")
    motiv = TextInput(label="Motivations", style=discord.TextStyle.paragraph, placeholder="Pourquoi vous ?")

    async def on_submit(self, interaction: discord.Interaction):
        await interaction.response.defer(ephemeral=True)
        
        embed = discord.Embed(
            description=f"👋 **NOUVELLE CANDIDATURE REÇUE**\n\n"
                        f"**👤 IDENTITÉ**\n"
                        f"> **Candidat :** {interaction.user.mention} ({interaction.user})\n"
                        f"> **Âge :** `{self.age.value} ans`\n"
                        f"> **Poste :** `{self.poste.value}`\n\n"
                        f"**📅 DISPONIBILITÉS**\n"
                        f"```fix\n{self.dispo.value}\n```\n"
                        f"**📂 EXPÉRIENCES**\n"
                        f"```\n{self.exp.value}\n```\n"
                        f"**🎯 MOTIVATIONS**\n"
                        f"```\n{self.motiv.value}\n```",
            color=0x2b2d31
        )
        
        embed.set_author(name=interaction.user.display_name, icon_url=interaction.user.display_avatar.url)
        embed.set_footer(text=f"Envoyé le {datetime.now().strftime('%d/%m/%Y à %H:%M')}")

        try:
            admin = await interaction.client.fetch_user(MON_ID)
            await admin.send(content=f"🔔 **Nouvelle candidature de {interaction.user.mention} !**", embed=embed)
            await interaction.followup.send("✅ **Succès :** Ta candidature a été envoyée au staff.", ephemeral=True)
        except Exception as e:
            print(f"Erreur envoi MP : {e}")
            await interaction.followup.send("⚠️ **Erreur :** Je n'ai pas pu envoyer ta candidature au staff.", ephemeral=True)

class MyBot(discord.Client):
    def __init__(self):
        super().__init__(intents=discord.Intents.all())
        self.tree = app_commands.CommandTree(self)

    async def setup_hook(self):
        await self.tree.sync()

bot = MyBot()

@bot.tree.command(name="recrutement", description="Lancer le recrutement")
async def recrutement(interaction: discord.Interaction):
    embed_start = discord.Embed(
        title="💼 Recrutement Staff",
        description="Cliquez sur le bouton pour postuler. Votre candidature sera transmise au staff.",
        color=0x5865f2
    )
    
    view = discord.ui.View(timeout=None)
    btn = discord.ui.Button(label="Postuler", style=discord.ButtonStyle.primary, emoji="✉️")
    
    async def callback(interaction):
        await interaction.response.send_modal(RecrutementModal())
    
    btn.callback = callback
    view.add_item(btn)
    await interaction.response.send_message(embed=embed_start, view=view)

@bot.event
async def on_ready():
    print(f"✅ Bot prêt ! Il enverra les candidatures à l'ID : {MON_ID}")

# Lancement du serveur web et du bot
keep_alive()
bot.run(TOKEN)
