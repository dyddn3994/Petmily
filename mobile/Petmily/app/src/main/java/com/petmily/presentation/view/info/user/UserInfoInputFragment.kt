package com.petmily.presentation.view.info.user

import android.content.Context
import android.os.Bundle
import android.text.Editable
import android.text.TextUtils.replace
import android.text.TextWatcher
import android.view.View
import android.widget.ArrayAdapter
import androidx.fragment.app.activityViewModels
import androidx.fragment.app.commit
import com.bumptech.glide.Glide
import com.petmily.R
import com.petmily.config.BaseFragment
import com.petmily.databinding.FragmentUserInfoInputBinding
import com.petmily.presentation.view.MainActivity
import com.petmily.presentation.view.info.pet.PetInfoInputFragment
import com.petmily.presentation.viewmodel.MainViewModel
import com.petmily.util.CheckPermission
import com.petmily.util.GalleryUtil

class UserInfoInputFragment : BaseFragment<FragmentUserInfoInputBinding>(FragmentUserInfoInputBinding::bind, R.layout.fragment_user_info_input) {

    private lateinit var mainActivity: MainActivity
    private lateinit var galleryUtil: GalleryUtil
    private lateinit var checkPermission: CheckPermission
    private val mainViewModel: MainViewModel by activityViewModels()

    override fun onAttach(context: Context) {
        super.onAttach(context)
        mainActivity = context as MainActivity
        galleryUtil = GalleryUtil()
        checkPermission = CheckPermission()
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        initImageView()
        initEditText()
        initBtn()
    }

    private fun initImageView() = with(binding) {
        // 프로필 사진 setting
        // TODO: Room에 userProfileImage 갱신 & 서버에 userProfileImage 갱신

        // userInfoInput의 프레그먼트 상태일 때 ->
        if (mainViewModel.getFromGalleryFragment() == "userInfoInput") {
            Glide.with(mainActivity)
                .load(mainViewModel.getSelectProfileImage()) // 내가 선택한 사진이 우선 들어가가있음
                .circleCrop()
                .into(ivUserImage)

            mainViewModel.setFromGalleryFragment("")
        }

        // 프로필 사진 view
        ivUserImage.setOnClickListener {
            if (checkPermission.requestStoragePermission()) { // 갤러리 접근 권한 체크
                if (galleryUtil.getImages(mainActivity, mainViewModel)) { // 갤러리 이미지를 모두 로드 했다면
                    mainViewModel.setFromGalleryFragment("userInfoInput")
                    mainActivity.changeFragment("gallery")
                }
            }

            // 선호 반려동물
            actFavorAnimal.setAdapter(ArrayAdapter(requireContext(), R.layout.dropdown_email, species))
        }
    }

    private fun initEditText() = with(binding) {
        // 이메일 입력
        etId.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {}
            override fun onTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {}
            override fun afterTextChanged(p0: Editable?) {
                if (tilId.isErrorEnabled) tilId.isErrorEnabled = false
            }
        })

        // 선호 반려동물
        actFavorAnimal.setAdapter(ArrayAdapter(requireContext(), R.layout.dropdown_email, species))
    }

    private fun initBtn() = with(binding) {
        // 닉네임 중복확인
        btnNicknameDupConfirm.setOnClickListener {
            if (etId.text.isNullOrBlank()) tilId.error = getString(R.string.userinfoinput_error_nickname)

            if (tilId.error.isNullOrBlank()) {
            }
        }

        // 반려동물 정보 입력
        btnInputPet.setOnClickListener {
            parentFragmentManager.commit {
                replace(R.id.frame_layout_main, PetInfoInputFragment())
                addToBackStack("petInfoInput")
            }
        }

        // 완료
        btnConfirm.setOnClickListener {
        }
    }

    private fun apiNicknameDupCheck() {
    }

    companion object {
        val species = arrayOf(
            "강아지",
            "고양이",
            "기타 동물",
        )
    }
}
