package com.pjt.petmily.domain.sns.board;

import com.pjt.petmily.domain.sns.board.dto.BoardRequestDto;
import com.pjt.petmily.domain.sns.board.dto.ResponseBoardAllDto;
import com.pjt.petmily.domain.sns.board.hashtag.HashTagRequestDto;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface BoardService {

    void boardSave(BoardRequestDto boardRequestDto, List<MultipartFile> boardImgFiles, HashTagRequestDto hashTagRequestDto) throws Exception;

    void boardUpdate(Long boardId, BoardRequestDto boardRequestDto, List<MultipartFile> boardImgFiles, HashTagRequestDto hashTagRequestDto) throws Exception;

    void boardDelete(Long boardId);

    List<ResponseBoardAllDto> getAllBoard(String currentUserEmail);
    ResponseBoardAllDto getOneBoard(Long boardId, String currentUserEmail);
}