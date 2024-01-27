package com.examportal.backend.service.impl;

import com.examportal.backend.models.exam.Category;
import com.examportal.backend.repository.CategoryRepository;
import com.examportal.backend.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.Set;
@Service
public class CategoryServiceImpl implements ICategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category getCategory(Long categoryId) {
        return categoryRepository.findById(categoryId).get();
    }

    @Override
    public void deleteCategory(Long categoryId) {
         categoryRepository.delete(getCategory(categoryId));
    }

    @Override
    public Set<Category> getCategories() {
      return new LinkedHashSet<>(categoryRepository.findAll());
//        Set<Category> set = new LinkedHashSet<>();
//          set.addAll(categoryRepository.findAll());
//          return set;
    }
}
