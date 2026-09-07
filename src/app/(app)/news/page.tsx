"use client";
import { useState, useMemo } from "react";
import { Plus, Search } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import NewsCard from "@/components/news/NewsCard";
import AddNewsModal from "@/components/news/AddNewsModal";
import UpdateNewsModal from "@/components/news/UpdateNewsModal";
import DeleteNewsModal from "@/components/news/DeleteNewsModal";
import { NewsArticle, NewsFormData } from "@/types/news";

const initialArticles: NewsArticle[] = [
  {
    id: "news-1",
    title: "The Intersection of Clay Court Tennis and Premium Business Capital",
    clubScope: "T2B",
    status: "PUBLISHED",
    geoScope: "NATIONAL",
    isFeatured: true,
    coverImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    body: "Switzerland's private banks continue to view recreational sporting venues as the premier vehicle for wealth relations. In this expose, we review how Geneva's private bankers leverage high-prestige clay...",
    createdAt: "2026-08-15",
  },
  {
    id: "news-2",
    title: "Ice Hockey Skyboxes as the New Swiss Boardroom",
    clubScope: "H2B",
    status: "PUBLISHED",
    geoScope: "NATIONAL",
    isFeatured: false,
    coverImage:
      "https://images.unsplash.com/photo-1542144512-9b509b5785c6?auto=format&fit=crop&q=80&w=600",
    body: "As business networking evolves, executive suites in modern Swiss ice hockey arenas (like the Swiss Life Arena and PostFinance Arena) are quickly outpacing classic golf courses as the high-energy...",
    createdAt: "2026-08-20",
  },
  {
    id: "news-3",
    title: "Basel Tennis Circle Announces Autumn Tournament Expansion",
    clubScope: "T2B",
    status: "PUBLISHED",
    geoScope: "REGIONAL",
    canton: "Basel",
    isFeatured: false,
    coverImage: "",
    body: "The Basel Regional Chapter has finalized planning for the Basel Autumn Business Cup, co-sponsored by Roche Holding and LGT Group. Over 40 corporate teams are estimated to register.",
    createdAt: "2026-08-28",
  },
];

const NewsPage = () => {
  const [articles, setArticles] = useState<NewsArticle[]>(initialArticles);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [deletingArticle, setDeletingArticle] = useState<NewsArticle | null>(null);

  const handleAddArticle = (data: NewsFormData) => {
    const newArticle: NewsArticle = {
      id: `news_${Date.now()}`,
      title: data.title,
      clubScope: data.clubScope,
      status: data.status,
      geoScope: data.geoScope,
      canton: data.canton,
      isFeatured: data.isFeatured,
      coverImage: data.coverImage,
      body: data.body,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setArticles((prev) => [newArticle, ...prev]);
  };

  const handleUpdateArticle = (articleId: string, data: NewsFormData) => {
    setArticles((prev) =>
      prev.map((art) => {
        if (art.id === articleId) {
          return {
            ...art,
            title: data.title,
            clubScope: data.clubScope,
            status: data.status,
            geoScope: data.geoScope,
            canton: data.canton,
            isFeatured: data.isFeatured,
            coverImage: data.coverImage,
            body: data.body,
          };
        }
        return art;
      })
    );
  };

  const handleToggleFeatured = (articleId: string) => {
    setArticles((prev) =>
      prev.map((art) =>
        art.id === articleId ? { ...art, isFeatured: !art.isFeatured } : art
      )
    );
  };

  const handleDeleteArticle = (articleId: string) => {
    setArticles((prev) => prev.filter((art) => art.id !== articleId));
  };

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesSearch =
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (art.canton && art.canton.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === "ALL" || art.clubScope === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [articles, searchQuery, selectedCategory]);

  const pageActions = (
    <button
      type="button"
      onClick={() => setIsAddModalOpen(true)}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-bg-dark text-xs font-extrabold hover:brightness-110 shadow-[0_0_12px_rgba(198,241,53,0.3)] transition-all cursor-pointer"
    >
      <Plus className="w-4 h-4 stroke-3" />
      <span>Add Article</span>
    </button>
  );

  return (
    <PageContainer
      title="News Management"
      description="Publish editorial columns, announce local tournaments, and manage regional circulars"
      actions={pageActions}
    >
      <div className="space-y-6">
        {/* Search & Filter Bar */}
        <div className="bg-card border border-card-border rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 shadow-xl">
          {/* Search input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-description/70" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search within published Swiss media, editorial transcripts..."
              className="w-full pl-10 pr-4 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title placeholder:text-description/50 focus:outline-none focus:border-primary/60 transition-colors"
            />
          </div>

          {/* Category Filter Select */}
          <div className="w-full sm:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-sidebar border border-card-border rounded-xl text-xs text-title font-semibold focus:outline-none focus:border-primary/60 transition-colors cursor-pointer"
            >
              <option value="ALL">ALL CLUB CATEGORIES</option>
              <option value="T2B">Tennis to Business (T2B)</option>
              <option value="H2B">Hockey to Business (H2B)</option>
              <option value="COMBINED">Both Clubs (T2B & H2B)</option>
            </select>
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="bg-card border border-card-border rounded-2xl p-12 text-center text-description text-xs">
            No press articles match your search criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                onEdit={(art) => setEditingArticle(art)}
                onToggleFeatured={handleToggleFeatured}
                onDelete={(art) => setDeletingArticle(art)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Article Modal */}
      <AddNewsModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddArticle}
      />

      {/* Edit Article Modal */}
      <UpdateNewsModal
        isOpen={!!editingArticle}
        article={editingArticle}
        onClose={() => setEditingArticle(null)}
        onUpdate={handleUpdateArticle}
      />

      {/* Delete Article Modal */}
      <DeleteNewsModal
        isOpen={!!deletingArticle}
        article={deletingArticle}
        onClose={() => setDeletingArticle(null)}
        onConfirmDelete={handleDeleteArticle}
      />
    </PageContainer>
  );
};

export default NewsPage;
