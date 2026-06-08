Set shell = CreateObject("WScript.Shell")
scriptDir = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
command = "cmd.exe /k """ & scriptDir & "\iniciar-servidor.cmd"""
shell.Run command, 1, False
