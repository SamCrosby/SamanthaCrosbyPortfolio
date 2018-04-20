<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Category;

class OpenCategoryController extends Controller
{
    /*
           * Get all categories and return them as a json collection.
           */

    public function index()
    {
        // get all the articles
        $categories = Category::with('user', 'categories')->get();

        //return $articles;
        return response()->json([
            'data' => $this->transformCollection($categories)
        ], 200);
    }

    /*
           * Get the category and return it as json.
           *
           * Return it via the transform method to cleanse and restrict.
           *
           * Also send response code back.
           */

    public function show($id)
    {
        // get the article
        $category = Category::with('user', 'categories')->where('id', $id)->first();

        //return $category;

        //if article does not exist return to list
        if (!$category) {
            return response()->json([
                'error' => ['message' => 'Category does not exist']
            ], 404);
        }
        //if article exists clean it via the transform method
        return response()->json([
            'data' => $category
        ], 200);
    }

    /*
     * Take the collection and separate out as individual articles to pass through the transform method.
     */

    private function transformCollection($categories){
        return array_map([$this, 'transform'], $categories->toArray());
    }

    /*
      * transform AN article to restrict fields and change the true DB column names.
      *
      * article author shows how we access joined tables data.
      */
    private function transform($category){
        return [
            'category_id' => $category['id'],
            'category_title' => $category['title'],
            'category_detail' => $category['content'],
        ];
    }}
