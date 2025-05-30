$propertyTypes = @("apartment", "villa", "house", "condo", "brownstone", "penthouse")

foreach ($type in $propertyTypes) {
    $outputPath = "d:\All Test File\New folder\real-estate-website\src\assets\images\properties\$type.jpg"
    $url = "https://source.unsplash.com/random/800x600/?$type+property"
    
    Write-Host "Downloading $type image from $url to $outputPath"
    
    try {
        Invoke-WebRequest -Uri $url -OutFile $outputPath
        Write-Host "Downloaded $type image successfully"
    } catch {
        Write-Host "Failed to download $type image: $_"
    }
}
