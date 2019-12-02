/**
 * Create a new file item from #file-template and add it too an element
 *
 * @param {string} fname the file name
 * @param {string} fpath file path
 * @param {number} size the size of the file (cosmetic purpose only)
 * @param {string} lastMod the last modification date of the file (cosmetic purpose only)
 * @param {boolean} isDir is the file a directory (corresponding icons will be applies depend on the type)
 * @param {Selector} elementToAppend a jquery selector that points to the table the element will be appended to
 *                                   Default value is #file-container
 */
function fileContainerAddItemD(fname, fpath, size, lastMod, isDir, elementToAppend="#file-container")
{
    let $templateElement = $("#file-template").clone(false);
    $templateElement.removeAttr("id");
    $templateElement.find("#file-selection").attr("value", fpath).removeAttr("id");

    let $img;
    if (isDir)
    // Use the folder image if the file type is a directory else use a file image
        $img = $("#img-dir").clone(false).removeAttr("id");
    else
        $img = $("#img-file").clone(false).removeAttr("id");

    $templateElement.find("#file-type").append($img).removeAttr("id");

    // Direct file link
    if (isDir)
    // Call changeDirectory if the clicked file is a directory, else we'll directly link the file which the server will serve
    {
        $templateElement.find("#file-name").attr("href", `javascript:changeDirectory("${fpath}");`).html(fname).removeAttr("id");
    }
    else
    {
        if (cfgAllowTokenUrlParam && !readCookie("AccessToken") && getUrlVars()["token"])
        {
            $templateElement.find("#file-name").attr("href", `${fpath}?token=${getUrlVars()["token"]}`).html(fname).removeAttr("id");
        }
        else
        {
            $templateElement.find("#file-name").attr("href", `${fpath}`).html(fname).removeAttr("id");
        }
    }

    $templateElement.find("#file-lastmod").html(lastMod).removeAttr("id");
    $templateElement.find("#file-size").html(size).removeAttr("id");

    // New tab stuff
    if (isDir)
    {
        if (cfgAllowTokenUrlParam && !readCookie("AccessToken") && getUrlVars()["token"])
        {
            $templateElement.find("#file-newtab").attr("href", `/?path=${fpath}&token=${getUrlVars()["token"]}`).attr("target", "_blank").removeAttr("id");
            $templateElement.find("#file-copy-token").click(function() {setClipBoardData(`/?path=${decodeURI(fpath)}&token=${getUrlVars()["token"]}`);})
        }
        else
        {
            $templateElement.find("#file-newtab").attr("href", `/?path=${fpath}`).attr("target", "_blank").removeAttr("id"); 
        }
    }
    else
    {
        if (cfgAllowTokenUrlParam && !readCookie("AccessToken") && getUrlVars()["token"])
        {
            $templateElement.find("#file-newtab").attr("href", `${fpath}?token=${getUrlVars()["token"]}`).attr("target", "_blank").removeAttr("id");
        }
        else
        {
            $templateElement.find("#file-newtab").attr("href", `${fpath}`).attr("target", "_blank").removeAttr("id");
        }
    }
    
    $templateElement.appendTo(elementToAppend);
}


function fileContainerAddItem(fname, fpath, size, lastMod, isDir, elementToAppend="#file-container")
{
    var $template = $("#file-template").clone(false).removeAttr("id");

    $template.find("#file-selection").attr("value", fpath).removeAttr("id");
    $template.find("#file-lastmod").html(lastMod).removeAttr("id");
    $template.find("#file-size").html(size).removeAttr("id");

    var $icon;
    if (isDir)
    {
        $icon = $("#img-dir").clone(false).removeAttr("id");
        $template.find("#file-name").attr("href", `javascript:changeDirectory("${fpath}");`).html(fname).removeAttr("id");
        // changeDirectory function will handle url tokens
    
        if (cfgAllowTokenUrlParam && !readCookie("AccessToken") && getUrlVars()["token"])
        {
            $template.find("#file-newtab").attr("href", `/?path=${fpath}&token=${getUrlVars()["token"]}`).attr("target", "_blank").removeAttr("id");
        }
        else
        {
            $template.find("#file-newtab").attr("href", `/?path=${fpath}`).attr("target", "_blank").removeAttr("id"); 
        }
    }
    else  // If it's not a directory
    {
        $icon = $("#img-file").clone(false).removeAttr("id");

        if (cfgAllowTokenUrlParam && !readCookie("AccessToken") && getUrlVars()["token"])
        {
            $template.find("#file-newtab").attr("href", `${fpath}?token=${getUrlVars()["token"]}`).attr("target", "_blank").removeAttr("id");
            $template.find("#file-name").attr("href", `${fpath}?token=${getUrlVars()["token"]}`).html(fname).removeAttr("id");
        }
        else
        {
            $template.find("#file-newtab").attr("href", `${fpath}`).attr("target", "_blank").removeAttr("id");
            $template.find("#file-name").attr("href", `${fpath}`).html(fname).removeAttr("id");
        }
    }

    console.log(cfgAllowTokenUrlParam);
    if (cfgAllowTokenUrlParam)
    {
        var token = null;
        if (getUrlVars()["token"])
        {
            token = getUrlVars()["token"]
        }
        else
        {
            token = readCookie("AccessToken");
        }
        // console.log(`${window.location.origin}/?path=${decodeURI(fpath)}&token=${token}`);
        if (isDir)
        {
            $template.find("#access-token-link").val(`${window.location.origin}/?path=${decodeURI(fpath)}&token=${token}`).click(function() {console.log("Bruh")}).removeAttr("id");
        }
        else
        {
            $template.find("#access-token-link").val(`${window.location.origin}${decodeURI(fpath)}?token=${token}`).click(function() {console.log("Bruh")}).removeAttr("id");
        }
        $template.find("#file-copy-token").click(function() {setClipBoardData()});
    }

    $template.find("#file-type").append($icon).removeAttr("id");

    $template.appendTo(elementToAppend);
}


/**
 * Set total files and dirs number to display
 *
 * @param {number} totalFile total file this directory contains
 * @param {number} totalDir total directorys this dir contains
 */
function setTotalDirAndFile(totalFile, totalDir)
{
    $("#file-count").html(totalFile);
    $("#dir-count").html(totalDir);
}

/**
 * Remove all displayed file from the table except for the row with return to parent dir
 */
function removeAllDisplayedFiles()
{
    $("#file-container").find("tr:gt(0)").remove();
}

/**
 * Set the label for how many files are selected and the names of those file
 */
function setUploadFileLabel()
{
    let fileInputElement = document.getElementById("file-upload");  // get file input element
    if ("files" in fileInputElement)   // if there are files selected
    {
        if (!fileInputElement.files.length) // if no files are selected
        {
            $("#file-upload-label").html("Choose file");
        }
        else  // if files are selected
        {
            let totalFiles = 0;
            for (let i = 0; i < fileInputElement.files.length; i++)  // Count files in total
            {
                let file = fileInputElement.files[i]; 
                totalFiles += 1;
            }
            if (totalFiles > 1)  // if there is more than one file selected
            { 
                let firstFileName = fileInputElement.files[0].name
                $("#file-upload-label").html(firstFileName + " and " + (totalFiles - 1) + " More");
            }
            else  // if only one files are selected
            {
                let firstFileName = fileInputElement.files[0].name
                $("#file-upload-label").html(firstFileName);
            }
        }
    }
}
