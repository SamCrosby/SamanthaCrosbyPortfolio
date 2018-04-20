<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Article;

class OpenArticleController extends Controller
{
    /*
           * Get all articles and return them as a json collection.
           */

    public function index()
    {
        // get all the articles
        $articles = Article::with('user', 'categories')->get();

        //return $articles;
        return response()->json([
            'data' => $this->transformCollection($articles)
        ], 200);
    }

    /*
           * Get the article and return it as json.
           *
           * Return it via the transform method to cleanse and restrict.
           *
           * Also send response code back.
           */

    public function show($id)
    {
        // get the article
        $article = Article::with('user', 'categories')->where('id', $id)->first();

        //return $article;

        //if article does not exist return to list
        if (!$article) {
            return response()->json([
                'error' => ['message' => 'Article does not exist']
            ], 404);
        }
        //if article exists clean it via the transform method
        return response()->json([
            'data' => $article
        ], 200);
    }

        /*
         * Take the collection and separate out as individual articles to pass through the transform method.
         */

         private function transformCollection($articles){
             return array_map([$this, 'transform'], $articles->toArray());
    }

    /*
      * transform AN article to restrict fields and change the true DB column names.
      *
      * article author shows how we access joined tables data.
      */
    private function transform($article){
        return [
          'article_id' => $article['id'],
          'article_title' => $article['title'],
          'article_body' => $article['content'],
          'article_author' => $article['user']['name'],
          //'article_author' => $article->user->name,
        ];
    }

}
