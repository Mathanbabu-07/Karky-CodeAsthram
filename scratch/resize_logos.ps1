Add-Type -AssemblyName System.Drawing

function Resize-Image($srcPath, $destPath) {
    $img = [System.Drawing.Image]::FromFile($srcPath)
    $bmp = New-Object System.Drawing.Bitmap(256, 256)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, 0, 0, 256, 256)
    $img.Dispose()
    $g.Dispose()
    $bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
}

Resize-Image "d:\documents\Karky-CodeAsthram\public\java_logo.png" "d:\documents\Karky-CodeAsthram\public\java_logo_min.png"
Remove-Item "d:\documents\Karky-CodeAsthram\public\java_logo.png"
Move-Item "d:\documents\Karky-CodeAsthram\public\java_logo_min.png" "d:\documents\Karky-CodeAsthram\public\java_logo.png"

Resize-Image "d:\documents\Karky-CodeAsthram\public\js_logo.png" "d:\documents\Karky-CodeAsthram\public\js_logo_min.png"
Remove-Item "d:\documents\Karky-CodeAsthram\public\js_logo.png"
Move-Item "d:\documents\Karky-CodeAsthram\public\js_logo_min.png" "d:\documents\Karky-CodeAsthram\public\js_logo.png"

Write-Host "Logos resized successfully!"
