package lk.ijse.market.controller;

import lk.ijse.market.service.CustomerService;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("market/v1/upload")
@CrossOrigin
public class UploadController {

    private static String UPLOAD_DIR="WEB-INF/images";

    @PostMapping("/customer")
    public String uploadCustomerPhoto(@RequestParam("file") MultipartFile file, HttpServletRequest request){
        try{

            String orgFileName=file.getOriginalFilename();
//            String[] fileParts = orgFileName.split("\\.(?=[^\\.]+$)");
//            String fileName=(customerService.getLastCustomer().getId()+1)+"."+fileParts[1];

            String path=request.getServletContext().getRealPath("")+UPLOAD_DIR+"/customer"+ File.separator +orgFileName;
            InputStream inputStream=file.getInputStream();

            saveFile(inputStream,path);
            return orgFileName;

        }catch(Exception e){
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/item")
    public String uploadItemPhoto(@RequestParam("file") MultipartFile file, HttpServletRequest request){
        try{

            String orgFileName=file.getOriginalFilename();
//            String[] fileParts = orgFileName.split("\\.(?=[^\\.]+$)");
//            String fileName=(customerService.getLastCustomer().getId()+1)+"."+fileParts[1];

            String path=request.getServletContext().getRealPath("")+UPLOAD_DIR+"/item"+ File.separator +orgFileName;
            InputStream inputStream=file.getInputStream();

            saveFile(inputStream,path);
            return orgFileName;

        }catch(Exception e){
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    private void saveFile(InputStream inputStream,String path){
        File targetFile = new File(path);

        try {
            java.nio.file.Files.copy(
                    inputStream,
                    targetFile.toPath(),
                    StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
        }


        IOUtils.closeQuietly(inputStream);
    }
}
