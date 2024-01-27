package com.examportal.backend.service;

import com.examportal.backend.models.exam.Category;

import java.util.Set;

public interface ICategoryService {
    Category  addCategory(Category category);
    Category updateCategory(Category category);
    Category getCategory(Long categoryId);
    void deleteCategory(Long categoryId);
    Set<Category> getCategories();
}
