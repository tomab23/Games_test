import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

type Game = {
  id: number;
  name: string;
  background_image?: string;
};

type SearchProps = {
  apiKey: string;
  placeholder?: string;
  pageSize?: number;
};

const RAWGSearch: React.FC<SearchProps> = ({
  apiKey,
  placeholder = 'Rechercher un jeu...',
  pageSize = 10,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState<number | null>(null);

  const fetchResults = async (url?: string) => {
    if (!query && !url) return;

    setLoading(true);
    setError(null);

    try {
      const endpoint = url
        ? url
        : `https://api.rawg.io/api/games?search=${encodeURIComponent(query)}&page_size=${pageSize}&key=${apiKey}`;

      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('Erreur lors de la récupération des jeux');

      const data = await response.json();

      setResults((prev) => (url ? [...prev, ...data.results] : data.results));
      setNextUrl(data.next);
      if (!url) {
        // On met à jour le total uniquement lors de la première recherche
        setTotalResults(data.count);
      }
    } catch (err: any) {
      setError(err.message || 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!query) return;
    fetchResults();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchResults();
    }
  };

  return (
    <div className="space-y-4 w-full max-w-md mx-auto">
      <div className="flex items-center gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Rechercher'}
        </Button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {totalResults !== null && (
        <p className="text-gray-500 text-sm">
          {totalResults === 0 ? 'Aucun résultat trouvé.' : `${totalResults} résultat(s) trouvé(s).`}
        </p>
      )}

      <div className="space-y-2">
        {results.map((game) => (
          <Card key={game.id}>
            <CardContent className="p-4 flex items-center gap-4">
              {game.background_image && (
                <img src={game.background_image} alt={game.name} className="w-16 h-16 object-cover rounded" />
              )}
              <p className="font-medium">{game.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {nextUrl && (
        <Button onClick={() => fetchResults(nextUrl)} disabled={loading} variant="outline" className="w-full">
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Charger plus'}
        </Button>
      )}
    </div>
  );
};

export default RAWGSearch;