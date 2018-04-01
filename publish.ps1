param (
    [string]$commitmessage = $( Read-Host "commit message, please" )
)
Get-ChildItem . -r docs | Remove-Item -r -force
Set-Location partners
hugo server -b https://www.elasticmint.com/ --appendPort=false --renderToDisk
Set-Location ..

git add .
#git commit and push


